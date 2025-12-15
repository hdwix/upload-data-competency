import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ECompetencyType } from "../enum/competency-type.enum";
import { EWorklistCategory, EStatus } from "../enum/worklist.enum";

@Entity({ name: "prf_competency_catalog_rating", synchronize: false })
export class CompetencyCatalogRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: EWorklistCategory,
  })
  category: EWorklistCategory;

  @Column({
    name: "detail_category",
    type: "enum",
    enum: [ECompetencyType.TECHNICAL, ECompetencyType.LEADERSHIP],
  })
  detailCategory: ECompetencyType;

  @Column({
    type: "varchar",
    length: 225,
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci",
  })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "int", nullable: true })
  scala: number;

  @Column({
    type: "enum",
    enum: EStatus,
  })
  status: EStatus;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated", type: "datetime" })
  updated: Date;
}
