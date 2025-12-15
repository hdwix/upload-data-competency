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

@Entity({ name: "prf_leadership_competency_rating", synchronize: false })
@Unique("uniq_by_assessment", ["competencyAttainmentId"])
export class LeadershipCompetencyRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "prf_competency_attainment_id", type: "int" })
  competencyAttainmentId: number;

  @Column({
    name: "leadership_competency_rating",
    type: "json",
  })
  leadershipCompetencyRating: CompetencyRatingMapping[];

  @Column({ name: "assessor_nik", type: "varchar", length: 100 })
  assessorNik: string;

  @Column({ name: "assessor_name", type: "varchar", length: 100 })
  assessorName: string;

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

  @Column({ name: "transaction_id" })
  transactionId: number;

  @Column({
    type: "enum",
    enum: ERoleCategory,
  })
  role: ERoleCategory;
}
