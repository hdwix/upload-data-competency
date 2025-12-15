import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Target } from "./target.entity";

@Entity({
  name: "prf_monitoring",
  schema: "hcis_monitoring_prod",
  synchronize: false,
})
export class Monitoring {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "target_id", nullable: true })
  targetId: number;

  @Column("double", { name: "achievement", nullable: true })
  achievement: number;

  @Column("text", { name: "description", nullable: true })
  description: string;

  @Column("text", { name: "attachment", nullable: true })
  attachment: string;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date;

  @Column("int", { name: "created_by", nullable: true })
  createdBy: number;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date;

  @Column("int", { name: "updated_by", nullable: true })
  updatedBy: number;

  @Column("datetime", { name: "tanggal", nullable: true })
  tanggal: Date;

  @Column("text", { name: "catatan", nullable: true })
  catatan: string;

  @Column("double", { name: "value", nullable: true })
  value: number;

  @Column("int", { name: "id_scoring", nullable: true })
  idScoring: number;

  @Column("text", { name: "progress_pengembangan_diri", nullable: true })
  progressPengembanganDiri: string;

  @Column("text", { name: "action_plan", nullable: true })
  actionPlan: string;

  @Column("text", { name: "progress_kinerja", nullable: true })
  progressKinerja: string;

  @Column("text", { name: "support_needed", nullable: true })
  supportNeeded: string;

  @Column("text", { name: "progress_status", nullable: true })
  progressStatus: string;

  @Column("text", { name: "supervisor_feedback", nullable: true })
  supervisorFeedback: string;

  @Column("date", { name: "completion_date", nullable: true })
  completionDate: Date;

  @Column("text", { name: "supervisor_review", nullable: true })
  supervisorReview: string;

  @Column("datetime", { name: "supervisor_review_date", nullable: true })
  supervisorReviewDate: Date;

  @Column("text", { name: "actual_achievement", nullable: true })
  actualAchievement: string;

  @ManyToOne(() => Target, (target) => target.monitorings)
  @JoinColumn({ name: "target_id" })
  target: Target;

  @Column("text", { name: "attachment_size", nullable: true })
  attachmentSize: string;

  @Column("text", { name: "attachment_type", nullable: true })
  attachmentType: string;
}
