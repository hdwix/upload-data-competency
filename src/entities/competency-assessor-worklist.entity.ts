import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EWorklistCategory } from "../enum/worklist.enum";

export enum ECompetencyAssessorWorklistStatus {
  PENDING = "pending",
  SEND = "send",
  CLOSED = "closed",
}

@Entity({ name: "prf_competency_assessor_worklist", synchronize: false })
export class CompetencyAssessorWorklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "worklist_id", type: "int", nullable: true })
  worklistId: number;

  @Column({ name: "spv_email", type: "varchar", length: 125, nullable: true })
  spvEmail: string;

  @Column({ name: "spv_nik", type: "varchar", length: 100, nullable: true })
  spvNik: string;

  @Column({ name: "spv_name", type: "varchar", length: 100, nullable: true })
  spvName: string;

  @Column({ name: "spv_title", type: "varchar", length: 100, nullable: true })
  spvTitle: string;

  @Column({
    name: "subordinate_email",
    type: "varchar",
    length: 125,
    nullable: true,
  })
  subordinateEmail: string;

  @Column({
    name: "subordinate_nik",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  subordinateNik: string;

  @Column({
    name: "subordinate_name",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  subordinateName: string;

  @Column({
    name: "subordinate_title",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  subordinateTitle: string;

  @Column({ name: "transaction_id", type: "int", nullable: true })
  transactionId: number;

  @Column({
    name: "category",
    type: "enum",
    enum: EWorklistCategory,
    nullable: true,
  })
  category: EWorklistCategory;

  @Column({
    name: "status",
    type: "enum",
    enum: ECompetencyAssessorWorklistStatus,
    nullable: true,
  })
  status: ECompetencyAssessorWorklistStatus;

  @CreateDateColumn({ name: "created_at", type: "datetime", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", nullable: true })
  updatedAt: Date;
}
