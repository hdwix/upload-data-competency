import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { MawpScoringItem } from "../interface/mawp-scoring-item.interface";

@Entity({ name: "prf_mawp_competency_scoring", synchronize: false })
@Unique("uniq_by_assessment", ["competencyAttainmentId"])
export class MawpCompetencyScoring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "prf_competency_attainment_id", type: "int" })
  competencyAttainmentId: number;

  @Column({ name: "mawp_competency_scoring", type: "json" })
  mawpCompetencyScoring: MawpScoringItem[];

  @Column({ name: "assessor_nik", type: "varchar", length: 100 })
  assessorNik: string;

  @Column({ name: "assessor_name", type: "varchar", length: 100 })
  assessorName: string;

  @Column({ name: "overall_feedback", type: "text", nullable: true })
  overallFeedback?: string;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "datetime",
    nullable: true,
  })
  deletedAt?: Date;
}
