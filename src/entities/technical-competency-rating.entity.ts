import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { ERoleCategory } from "../enum/worklist.enum";
import { CompetencyRatingMapping } from "../interface/competency-rating-mapping.interface";

@Entity({ name: "prf_technical_competency_rating", synchronize: false })
@Unique("uniq_by_assessment", ["competencyAttainmentId"])
export class TechnicalCompetencyRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "prf_competency_attainment_id", type: "int" })
  competencyAttainmentId: number;

  @Column({
    name: "technical_competency_rating",
    type: "json",
  })
  technicalCompetencyRating: CompetencyRatingMapping[];

  @Column({ name: "overall_feedback", type: "text", nullable: true })
  overallFeedback: string | null;

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

  @Column({ name: "assessor_nik" })
  assessorNik: string;

  @Column({ name: "assessor_name" })
  assessorName: string;

  @Column({ name: "transaction_id" })
  transactionId: number;

  @Column({
    type: "enum",
    enum: ERoleCategory,
  })
  role: ERoleCategory;
}
