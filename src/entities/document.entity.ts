import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Target } from "./target.entity";

@Entity({ name: "prf_document", synchronize: false })
export class Document {
  @PrimaryColumn()
  id: number;

  @Column({ name: "person_id" })
  personId: number;

  @Column({ name: "old_person_id" })
  oldPersonId: number;

  @Column({ name: "period_id" })
  periodId: number;

  @Column()
  assessor: number;

  @Column({ name: "old_assessor" })
  oldAssessor: number;

  @Column()
  reviewer: number;

  @Column({ name: "old_reviewer" })
  oldReviewer: number;

  @Column()
  status: string;

  @Column()
  title: string;

  @Column()
  organization: string;

  @Column({ name: "position_id" })
  positionId: number;

  @Column({ name: "job_id" })
  jobId: number;

  @Column()
  directorate: string;

  @Column()
  egrp: string;

  @Column()
  grp: string;

  @Column()
  division: string;

  @Column()
  department: string;

  @Column()
  section: string;

  @Column({ name: "created_at" })
  createdAt: string;

  @Column({ name: "created_by" })
  createdBy: number;

  @Column({ name: "old_created_by" })
  oldCreatedBy: number;

  @Column({ name: "updated_at" })
  updatedAt: string;

  @Column({ name: "updated_by" })
  updatedBy: number;

  @Column({ name: "old_updated_by" })
  oldUpdatedBy: number;

  @Column({ name: "start_date" })
  startDate: string;

  @Column({ name: "end_date" })
  endDate: string;

  @Column({ name: "flag_kalibrasi" })
  flagKalibrasi: number;

  @Column({ name: "jml_bulan" })
  jmlBulan: number;

  @Column({ name: "is_expert" })
  isExpert: number;

  @Column()
  area: string;

  @Column()
  admins: string;

  @Column({ name: "index_kinerja" })
  indexKinerja: number;

  @Column({ name: "sumber_daya" })
  sumberDaya: string;

  @Column({ name: "aspirasi_pengembangan_diri" })
  aspirasiPengembanganDiri: string;

  @Column({ name: "action_plan" })
  actionPlan: string;

  @Column({ name: "feedback_atasan" })
  feedbackAtasan: string;

  @Column({ name: "area_for_improvement" })
  areaForImprovement: string;

  @Column({ name: "additional_competency" })
  additionalCompetency: number;

  @Column({ name: "additional_competency_status" })
  additionalCompetencyStatus: string;

  @Column({ name: "jalur_karir" })
  jalurKarir: string;

  @Column({ name: "is_confirm" })
  isConfirm: number;

  @Column({ name: "is_confirm_atasan" })
  isConfirmAtasan: number;

  @OneToMany(() => Target, (target) => target.document)
  targets: Target[];
}
