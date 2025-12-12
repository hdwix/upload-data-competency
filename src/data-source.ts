// data-source.ts
import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { LxpCompetencyDescription } from "./lxp-competency-description.entity";
import { LxpCompetencyBehavior } from "./lxp-competency-behaviour.entity";

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
  entities: [LxpCompetencyDescription, LxpCompetencyBehavior],
  logging: false,
  // charset: 'utf8mb4', // optional
});
``;
