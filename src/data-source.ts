// data-source.ts
import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { LxpCompetencyDescription } from "./lxp-competency-description.entity";
import { LxpCompetencyBehavior } from "./lxp-competency-behaviour.entity";
import { BehaviorAssessor } from "./entities/behavior-assessor.entity";
import { CompetencyAssessorWorklist } from "./entities/competency-assessor-worklist.entity";
import { CompetencyAttainment } from "./entities/competency-attainment.entity";
import { CompetencyCatalogRating } from "./entities/competency-catalog-rating.entity";
import { Document } from "./entities/document.entity";
import { EmailList } from "./entities/email-list.entity";
import { EmployeePeriod } from "./entities/employee-period.entity";
import { Employee } from "./entities/employee.entity";
import { EvaluationAppraisal } from "./entities/evaluation-appraisal.entity";
import { LeadershipCompetencyRating } from "./entities/leadership-competency-rating.entity";
import { LxpNetwork } from "./entities/lxp-network.entity";
import { MawpCompetencyScoring } from "./entities/mawp-competency-scoring.entity";
import { Monitoring } from "./entities/monitoring.entity";
import { PeriodBreakdown } from "./entities/period-breakdown.entity";
import { PeriodCa } from "./entities/period-ca.entitiy";
import { Period } from "./entities/period.entity";
import { PrfCompetencyConfig } from "./entities/prf-competency-config.entity";
import { Recognition } from "./entities/recognition.entity";
import { ScoringCriteria } from "./entities/scoring-criteria.entity";
import { Target } from "./entities/target.entity";
import { TechnicalCompetencyRating } from "./entities/technical-competency-rating.entity";
import { TotalScore } from "./entities/total-score.entity";

dotenv.config();
console.log(process.env.DB_HOST);
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "test",
  synchronize: false,
  entities: [
    LxpCompetencyDescription,
    LxpCompetencyBehavior,
    Employee,
    EmployeePeriod,
    Period,
    ScoringCriteria,
    TotalScore,
    Document,
    Target,
    Monitoring,
    EmailList,
    Recognition,
    CompetencyAttainment,
    CompetencyCatalogRating,
    PeriodCa,
    BehaviorAssessor,
    CompetencyAssessorWorklist,
    PrfCompetencyConfig,
    LeadershipCompetencyRating,
    MawpCompetencyScoring,
    PeriodBreakdown,
    TechnicalCompetencyRating,
    EvaluationAppraisal,
    LxpNetwork,
  ],
  logging: false,
  // charset: 'utf8mb4', // optional
});
``;
