import "reflect-metadata";

import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { Workbook, Worksheet } from "exceljs";
import { QueryRunner } from "typeorm";

import { AppDataSource } from "./data-source";
import { EProficiencyLevel } from "./lxp-competency-behaviour.entity";
import { ELxpType } from "./lxp-competency-description.entity";

dotenv.config();

type LangCode = "ID" | "EN";

const MAX_TITLE_LEN = 150;
const MAX_DESC_LEN = 10000;

const LEVELS: EProficiencyLevel[] = [
  EProficiencyLevel.BASIC,
  EProficiencyLevel.INTERMEDIATE,
  EProficiencyLevel.PROFICIENT,
  EProficiencyLevel.ADVANCED,
  EProficiencyLevel.MASTER,
];

const LEVEL_ORDER: Record<EProficiencyLevel, number> = {
  [EProficiencyLevel.BASIC]: 1,
  [EProficiencyLevel.INTERMEDIATE]: 2,
  [EProficiencyLevel.PROFICIENT]: 3,
  [EProficiencyLevel.ADVANCED]: 4,
  [EProficiencyLevel.MASTER]: 5,
};

function detectLangFromSheet(sheetName: string, fallback?: LangCode): LangCode {
  const s = sheetName.toLowerCase();
  if (s.includes("eng") || s === "en") return "EN";
  if (s.includes("ind") || s.includes("id")) return "ID";
  return fallback || "ID";
}

/** Return string (trimmed) or null for empty cells */
function cellToStringOrNull(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "object") {
    const maybeText = (v as any).text ?? (v as any).toString?.() ?? "";
    const s = String(maybeText).trim();
    return s.length ? s : null;
  }
  const s = String(v).trim();
  return s.length ? s : null;
}

/** Enforce max length but preserve nulls */
function ensureLenNullable(
  label: string,
  s: string | null,
  max: number,
  truncate: boolean
): string | null {
  if (s == null) return null;
  if (s.length <= max) return s;
  const msg = `${label} length ${s.length} exceeds ${max}`;
  if (truncate) {
    console.warn(`[WARN] ${msg}. Truncating.`);
    return s.slice(0, max);
  }
  throw new Error(`[ERROR] ${msg}. Use --truncate or enlarge column length.`);
}

function mapLevelHeader(h: string): EProficiencyLevel | null {
  const key = h.trim().toLowerCase();
  switch (key) {
    case "basic":
      return EProficiencyLevel.BASIC;
    case "intermediate":
      return EProficiencyLevel.INTERMEDIATE;
    case "proficient":
      return EProficiencyLevel.PROFICIENT;
    case "advanced":
      return EProficiencyLevel.ADVANCED;
    case "master":
      return EProficiencyLevel.MASTER;
    default:
      return null;
  }
}

/** Return ELxpType or undefined (never null) */
function toType(val?: string): ELxpType | undefined {
  if (!val) return undefined;
  const v = val.toLowerCase();
  if (v === "technical") return ELxpType.TECHNICAL;
  if (v === "leadership") return ELxpType.LEADERSHIP;
  return undefined;
}

/**
 * Build a header map by merging two header rows:
 * - Row-1: "Competency", "Definition", "Key Behavior"
 * - Row-2: "Basic", "Intermediate", "Proficient", "Advanced", "Master"
 * Any column whose Row-1 header is "Key Behavior" (or blank) is replaced by Row-2 header.
 * (Matches your final script’s approach. ) [1](https://365tsel-my.sharepoint.com/personal/handoko_d_wicaksono_telkomsel_co_id/Documents/Microsoft%20Copilot%20Chat%20Files/final-script.txt)
 */
function buildHeaderMap(ws: Worksheet): {
  headerRowIdx: number;
  headerMap: Record<number, string>;
} {
  let headerRowIdx = -1;
  const headerMap: Record<number, string> = {};

  // Find first non-empty row as header row-1
  for (let r = 1; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    let hasCells = false;
    row.eachCell((cell) => {
      const s = cellToStringOrNull(cell.value);
      if (s) hasCells = true;
    });
    if (hasCells) {
      headerRowIdx = r;
      break;
    }
  }
  if (headerRowIdx < 0) return { headerRowIdx, headerMap };

  // Fill headerMap from row-1
  const headerRow = ws.getRow(headerRowIdx);
  headerRow.eachCell((cell, col) => {
    const s = cellToStringOrNull(cell.value);
    if (s) headerMap[col] = s;
  });

  // Merge with row-2 (if exists)
  const secondHeaderRow = ws.getRow(headerRowIdx + 1);
  if (secondHeaderRow && secondHeaderRow.cellCount > 0) {
    secondHeaderRow.eachCell((cell, col) => {
      const s2 = cellToStringOrNull(cell.value);
      const s1 = headerMap[col] ?? "";
      if (s2 && (!s1 || s1.toLowerCase() === "key behavior")) {
        headerMap[col] = s2;
      }
    });
  }

  return { headerRowIdx, headerMap };
}

/**
 * Read a worksheet to array of objects, using merged headerMap.
 * Data starts at (headerRowIdx + 2) to skip the two header rows
 * (as in your leadership workbook). [2](https://365tsel-my.sharepoint.com/personal/handoko_d_wicaksono_telkomsel_co_id/Documents/Microsoft%20Copilot%20Chat%20Files/testCompLeadershipData.xlsx)
 */
function rowsFromWorksheet(ws: Worksheet): {
  rows: Array<Record<string, any>>;
  headerMap: Record<number, string>;
} {
  const { headerRowIdx, headerMap } = buildHeaderMap(ws);
  const out: Array<Record<string, any>> = [];
  if (headerRowIdx < 0) return { rows: out, headerMap };

  for (let r = headerRowIdx + 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    let isEmpty = true;
    const obj: Record<string, any> = {};

    row.eachCell((cell, col) => {
      const header = headerMap[col];
      if (!header) return;
      const val = cellToStringOrNull(cell.value);
      obj[header] = val;
      if (val != null) isEmpty = false;
    });

    if (!isEmpty) out.push(obj);
  }

  return { rows: out, headerMap };
}

/**
 * Upsert parent row using null-safe equality (<=>) so NULL title/description still match.
 */
async function upsertCompetencyRaw(
  qr: QueryRunner,
  lang: LangCode,
  titleVal: string | null,
  descVal: string | null,
  effectiveType: ELxpType | undefined
): Promise<number> {
  const selectSql = `
    SELECT id
    FROM prf_lxp_competency_description
    WHERE title <=> ? AND lang = ?
    LIMIT 1
  `;
  const selectParams = [titleVal, lang];
  const rows = (await qr.query(selectSql, selectParams)) as Array<{
    id: number;
  }>;
  console.log("selected title : ", titleVal);
  console.log(rows);
  const typeValue = effectiveType ?? null;

  if (rows.length > 0) {
    const id = rows[0].id;
    const updateSql = `
      UPDATE prf_lxp_competency_description
      SET type = ?, lang = ?, description = ?
      WHERE id = ?
    `;
    const updateParams = [typeValue, lang, descVal, id];
    await qr.query(updateSql, updateParams);
    return id;
  }
  const insertSql = `
    INSERT INTO prf_lxp_competency_description
      (type, title, description, lang, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  const insertParams = [typeValue, titleVal, descVal, lang];
  const result: any = await qr.query(insertSql, insertParams);
  const newId = result?.insertId;
  if (newId) return newId;

  // Fallback: re-select to get id (rare)
  const retry = (await qr.query(selectSql, selectParams)) as Array<{
    id: number;
  }>;
  if (retry.length === 0)
    throw new Error("Failed to obtain inserted competency id.");
  return retry[0].id;
}

/**
 * Upsert behaviors — always write a row per level, even if behavior_desc is NULL.
 */
async function upsertBehaviorsRaw(
  qr: QueryRunner,
  compId: number,
  lang: LangCode,
  behaviorsByLevel: Partial<Record<EProficiencyLevel, string | null>>
): Promise<void> {
  for (const level of LEVELS) {
    const val = behaviorsByLevel[level] ?? null; // preserve null
    const text = val === null ? null : val; // already normalized

    const selectSql = `
      SELECT id
      FROM prf_lxp_competency_behavior
      WHERE competency_id = ? AND level = ? AND lang = ?
      LIMIT 1
    `;
    const selectParams = [compId, level, lang];
    const rows = (await qr.query(selectSql, selectParams)) as Array<{
      id: number;
    }>;

    if (rows.length > 0) {
      const id = rows[0].id;
      const updateSql = `
        UPDATE prf_lxp_competency_behavior
        SET behavior_desc = ?, level_order = ?
        WHERE id = ?
      `;
      const updateParams = [text, LEVEL_ORDER[level], id];
      await qr.query(updateSql, updateParams);
    } else {
      const insertSql = `
        INSERT INTO prf_lxp_competency_behavior
          (competency_id, level, behavior_desc, lang, level_order)
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertParams = [compId, level, text, lang, LEVEL_ORDER[level]];
      await qr.query(insertSql, insertParams);
    }
  }
}

async function run() {
  const fileArg = process.argv.find(
    (a) => a.endsWith(".xlsx") || a.endsWith(".xlsm")
  );
  const sheetArg = process.argv.find((a) => a.startsWith("--sheet="));
  const typeArg = process.argv.find((a) => a.startsWith("--type="));
  const langArg = process.argv.find((a) => a.startsWith("--lang="));
  const truncateFlag = process.argv.some((a) => a === "--truncate");

  if (!fileArg) {
    console.error(
      "Usage: ts-node src/import-competency-exceljs.ts <file.xlsx> [--sheet=IND] [--type=technical|leadership] [--lang=ID|EN] [--truncate]"
    );
    process.exit(1);
  }

  const explicitSheet = sheetArg?.split("=")[1];
  const explicitType = toType(typeArg?.split("=")[1]);
  const explicitLang = langArg
    ? (langArg.split("=")[1].toUpperCase() as LangCode)
    : undefined;

  const filePath = path.resolve(fileArg);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`Reading workbook: ${filePath}`);
  const wb = new Workbook();
  await wb.xlsx.readFile(filePath);

  const sheetNames = explicitSheet
    ? [explicitSheet]
    : wb.worksheets.map((w) => w.name);
  if (sheetNames.length === 0) {
    console.error("No sheets found in workbook.");
    process.exit(1);
  }

  await AppDataSource.initialize();
  console.log("MySQL connected.");

  try {
    for (const sheetName of sheetNames) {
      const ws = wb.getWorksheet(sheetName);
      if (!ws) {
        console.warn(`[WARN] Sheet '${sheetName}' not found; skipping.`);
        continue;
      }

      const lang = explicitLang || detectLangFromSheet(sheetName);
      console.log(`Processing sheet '${sheetName}' → lang=${lang}`);

      const { rows, headerMap } = rowsFromWorksheet(ws);
      const resolvedHeaders = Object.values(headerMap);
      const headersLower = resolvedHeaders.map((h) => h.toLowerCase());
      const hCompetency =
        resolvedHeaders[headersLower.indexOf("competency")] ?? "Competency";
      const hDefinition =
        resolvedHeaders[headersLower.indexOf("definition")] ?? "Definition";

      const levelHeaders: { header: string; level: EProficiencyLevel }[] = [];
      for (const h of resolvedHeaders) {
        const lvl = mapLevelHeader(h);
        if (lvl) levelHeaders.push({ header: h, level: lvl });
      }

      // One transaction per Excel row
      for (const [idx, row] of rows.entries()) {
        const titleRaw = cellToStringOrNull(row[hCompetency]);
        const defRaw = cellToStringOrNull(row[hDefinition]);
        if (titleRaw == null && defRaw == null) continue;

        const titleNorm = ensureLenNullable(
          "title",
          titleRaw,
          MAX_TITLE_LEN,
          truncateFlag
        );
        const descNorm = ensureLenNullable(
          "description",
          defRaw,
          MAX_DESC_LEN,
          truncateFlag
        );

        const behaviors: Partial<Record<EProficiencyLevel, string | null>> = {};
        for (const { header, level } of levelHeaders) {
          behaviors[level] = cellToStringOrNull(row[header]);
        }

        const effectiveType =
          explicitType ?? toType(process.env.DEFAULT_LXP_TYPE || "");

        const qr: QueryRunner = AppDataSource.createQueryRunner();
        await qr.connect();

        try {
          await qr.startTransaction();

          const compId = await upsertCompetencyRaw(
            qr,
            lang,
            titleNorm,
            descNorm,
            effectiveType
          );
          await upsertBehaviorsRaw(qr, compId, lang, behaviors);

          await qr.commitTransaction();
          console.log(
            `  [${sheetName}] Row ${idx + 1} committed: ${
              titleNorm ?? "(NULL title)"
            }`
          );
        } catch (e) {
          await qr.rollbackTransaction();
          console.error(
            `  [${sheetName}] Row ${idx + 1} rolled back: ${
              titleNorm ?? "(NULL title)"
            }`
          );
          console.error(e);
        } finally {
          await qr.release();
        }
      }
    }

    console.log("Import completed.");
  } finally {
    await AppDataSource.destroy();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
