import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Employee } from "./employee.entity";
import { ERoleCategory, EWorklistCategory } from "../enum/worklist.enum";

export enum ECompetencyStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  COMPLETED = "completed",
}

@Entity({ name: "prf_competency_attainment", synchronize: false })
export class CompetencyAttainment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "transaction_id", type: "int" })
  transactionId: number;

  @Column({ name: "period_id", type: "int" })
  periodId: number;

  @Column({ name: "tia_workflow_id", type: "int" })
  tiaWorkflowId: number;

  @Column({
    type: "enum",
    enum: ERoleCategory,
  })
  role: ERoleCategory;

  @Column({
    type: "enum",
    enum: EWorklistCategory,
  })
  category: EWorklistCategory;

  @Column({
    name: "assessee_nik",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  nik: string;

  @ManyToOne(() => Employee, { eager: false, nullable: true })
  @JoinColumn({ name: "assessee_nik", referencedColumnName: "nik" })
  assessee: Employee;

  @Column({
    name: "assessee_title",
    type: "varchar",
    length: 225,
    nullable: true,
  })
  title: string;

  @Column({
    name: "assessor_nik",
    type: "varchar",
    length: 50,
    nullable: false,
  })
  assessorNik: string;

  @ManyToOne(() => Employee, { eager: false, nullable: true })
  @JoinColumn({ name: "assessor_nik", referencedColumnName: "nik" })
  assessor: Employee;

  @Column({
    name: "assessor_title",
    type: "varchar",
    length: 225,
    nullable: false,
  })
  assessorTitle: string;

  @Column({ name: "assessor_remark", type: "text" })
  assessorRemark: string;

  @Column({ name: "assigned_by", type: "varchar", length: 15, nullable: false })
  assignedBy: string;

  @Column({
    name: "technical_final_result",
    type: "varchar",
    length: 15,
    nullable: true,
  })
  technicalFinalResult: string;

  @Column({
    name: "leadership_final_result",
    type: "varchar",
    length: 15,
    nullable: true,
  })
  leadershipFinalResult: string;

  @Column({
    name: "working_principle_final_result",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  workingPrincipleFinalResult: string;

  @Column({
    type: "enum",
    enum: ECompetencyStatus,
  })
  status: ECompetencyStatus;

  @Column({ name: "completed_at", type: "datetime", nullable: true })
  completedAt?: Date | null;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated", type: "datetime" })
  updated: Date;
}
