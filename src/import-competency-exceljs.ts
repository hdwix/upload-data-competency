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
const MAX_DESC_LEN = 10_000;

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

function normStr(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "object") {
    const maybeText = (v as any).text ?? (v as any).toString?.() ?? "";
    return String(maybeText).trim();
  }
  return String(v).trim();
}

function ensureLen(
  label: string,
  s: string,
  max: number,
  truncate: boolean
): string {
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
    case "Basic":
      return EProficiencyLevel.BASIC;
    case "Intermediate":
      return EProficiencyLevel.INTERMEDIATE;
    case "Proficient":
      return EProficiencyLevel.PROFICIENT;
    case "Advanced":
      return EProficiencyLevel.ADVANCED;
    case "Master":
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
 * Read a worksheet as array of objects using the first non-empty row as headers.
 * Uses row.eachCell(...) to avoid sparse/undefined Row.values.
 */
function rowsFromWorksheet(ws: Worksheet): Array<Record<string, any>> {
  const out: Array<Record<string, any>> = [];
  let headerRowIdx = -1;
  const headerMap: Record<number, string> = {};

  // 1) Find first non-empty row and treat as headers
  for (let r = 1; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    let hasCells = false;
    const localHeaders: Record<number, string> = {};

    row.eachCell((cell, col) => {
      const s = normStr(cell.value);
      if (s) {
        hasCells = true;
        localHeaders[col] = s;
      }
    });

    if (hasCells) {
      headerRowIdx = r;
      Object.assign(headerMap, localHeaders);
      break;
    }
  }

  if (headerRowIdx < 0) return out;

  // 2) Process data rows, data starts at 3rd row
  for (let r = headerRowIdx + 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    let isEmpty = true;
    const obj: Record<string, any> = {};

    row.eachCell((cell, col) => {
      const header = headerMap[col];
      if (!header) return;
      const s = normStr(cell.value);
      obj[header] = s;
      if (s) isEmpty = false;
    });

    if (!isEmpty) out.push(obj);
  }

  return out;
}

/**
 * Upsert parent row (prf_lxp_competency_description) using raw SQL:
 * - Lookup by (title, description, lang) to avoid cross-language collisions.
 * - If exists: UPDATE fields + updated_at.
 * - If not: INSERT with timestamps.
 * Returns the parent id.
 */
async function upsertCompetencyRaw(
  qr: QueryRunner,
  lang: LangCode,
  titleNorm: string,
  descNorm: string,
  effectiveType: ELxpType | undefined
): Promise<number> {
  const selectSql = `
    SELECT id
    FROM prf_lxp_competency_description
    WHERE title = ? AND description = ? AND lang = ?
    LIMIT 1
  `;
  const selectParams = [titleNorm, descNorm, lang];
  const rows = (await qr.query(selectSql, selectParams)) as Array<{
    id: number;
  }>;

  const typeValue = effectiveType ?? null; // pass NULL if type is undefined

  if (rows.length > 0) {
    const id = rows[0].id;
    const updateSql = `
      UPDATE prf_lxp_competency_description
      SET type = ?, lang = ?, description = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const updateParams = [typeValue, lang, descNorm, id];
    await qr.query(updateSql, updateParams);
    return id;
  }

  const insertSql = `
    INSERT INTO prf_lxp_competency_description
      (type, title, description, lang, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  const insertParams = [typeValue, titleNorm, descNorm, lang];
  const result: any = await qr.query(insertSql, insertParams);
  console.log("inserted operations on competency description : ");
  console.log(result);
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
 * Upsert behavior rows (prf_lxp_competency_behavior) using raw SQL:
 * - Per level: lookup by (competency_id, level, lang).
 * - If exists: UPDATE behavior_desc, level_order, updated_at.
 * - If not exists: INSERT row with created_at/updated_at.
 */
async function upsertBehaviorsRaw(
  qr: QueryRunner,
  compId: number,
  lang: LangCode,
  behaviorsByLevel: Partial<Record<EProficiencyLevel, string>>
): Promise<void> {
  for (const level of LEVELS) {
    const text = normStr(behaviorsByLevel[level]);
    if (!text) continue;

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
        SET behavior_desc = ?, level_order = ?, updated_at = NOW()
        WHERE id = ?
      `;
      const updateParams = [text, LEVEL_ORDER[level], id];
      await qr.query(updateSql, updateParams);
    } else {
      const insertSql = `
        INSERT INTO prf_lxp_competency_behavior
          (competency_id, level, behavior_desc, lang, level_order, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
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

      const rows = rowsFromWorksheet(ws);

      const headers = rows.length ? Object.keys(rows[0]) : [];
      const findHeader = (name: string) =>
        headers.find((h) => h.trim().toLowerCase() === name.toLowerCase());

      const hCompetency = findHeader("Competency") || "Competency";
      const hDefinition = findHeader("Definition") || "Definition";

      const levelHeaders: { header: string; level: EProficiencyLevel }[] = [];
      for (const h of headers) {
        const lvl = mapLevelHeader(h);
        if (lvl) levelHeaders.push({ header: h, level: lvl });
      }
      if (levelHeaders.length === 0) {
        console.warn(
          `[WARN] No level headers found in '${sheetName}'. Expected: Basic, Intermediate, Proficient, Advanced, Master.`
        );
      }

      // ⬇️ One transaction per Excel row
      for (const [idx, row] of rows.entries()) {
        const titleRaw = normStr(row[hCompetency]);
        const defRaw = normStr(row[hDefinition]);
        if (!titleRaw && !defRaw) continue;

        const titleNorm = ensureLen(
          "title",
          titleRaw,
          MAX_TITLE_LEN,
          truncateFlag
        );
        const descNorm = ensureLen(
          "description",
          defRaw,
          MAX_DESC_LEN,
          truncateFlag
        );

        const behaviors: Partial<Record<EProficiencyLevel, string>> = {};
        for (const { header, level } of levelHeaders) {
          behaviors[level] = normStr(row[header]);
        }

        const effectiveType =
          explicitType ?? toType(process.env.DEFAULT_LXP_TYPE || "");

        const qr: QueryRunner = AppDataSource.createQueryRunner();
        await qr.connect();

        try {
          await qr.startTransaction();

          // Parent upsert (title+description+lang)
          const compId = await upsertCompetencyRaw(
            qr,
            lang,
            titleNorm,
            descNorm,
            effectiveType
          );

          // Children upsert per level
          await upsertBehaviorsRaw(qr, compId, lang, behaviors);

          await qr.commitTransaction();
          console.log(
            `  [${sheetName}] Row ${idx + 1} committed: ${titleNorm}`
          );
        } catch (e) {
          await qr.rollbackTransaction();
          console.error(
            `  [${sheetName}] Row ${idx + 1} rolled back: ${titleNorm}`
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
