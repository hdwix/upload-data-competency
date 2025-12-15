import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum EBehaviorAssessorRole {
  SUPERVISOR = "SUPERVISOR",
  EMPLOYEE = "EMPLOYEE",
  PEERS = "PEERS",
}

export enum EBehaviorAssessorStatus {
  DRAFT = 0,
  SUBMITTED = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum EBehaviorAssessorKriteria {
  PARTIAL = "partial",
  COMPLETE = "complete",
}

@Entity({ name: "prf_behavior_assessor", synchronize: false })
export class BehaviorAssessor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "appraisal_id", type: "int", nullable: true })
  appraisalId: number;

  @Column({
    name: "role",
    type: "varchar",
    length: 45,
    nullable: true,
    comment: "SUPERVISOR/ EMPLOYEE/ PEERS",
  })
  role: EBehaviorAssessorRole;

  @Column({ name: "assessor_nik", type: "varchar", length: 32, nullable: true })
  assessorNik: string;

  @Column({ name: "assessor_remark", type: "text", nullable: true })
  assessorRemark: string;

  @Column({ name: "status", type: "int", nullable: true })
  status: EBehaviorAssessorStatus;

  @CreateDateColumn({ name: "created_at", type: "datetime", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime", nullable: true })
  updatedAt: Date;

  @Column({ name: "created_by", type: "int", nullable: true })
  createdBy: number;

  @Column({ name: "updated_by", type: "int", nullable: true })
  updatedBy: number;

  @Column({ name: "competency_list", type: "text", nullable: true })
  competencyList: string;

  @Column({ name: "rating_text", type: "text", nullable: true })
  ratingText: string;

  @Column({ name: "competency_rating", type: "int", nullable: true })
  competencyRating: number;

  @Column({ name: "flag_external", type: "int", default: 0 })
  flagExternal: number;

  @Column({ name: "nilai_akhir", type: "double", nullable: true })
  nilaiAkhir: number;

  @Column({ name: "nilai_akhir_technical", type: "double", nullable: true })
  nilaiAkhirTechnical: number;

  @Column({ name: "nilai_akhir_knowledge", type: "double", nullable: true })
  nilaiAkhirKnowledge: number;

  @Column({ name: "kriteria", type: "varchar", length: 45, nullable: true })
  kriteria: EBehaviorAssessorKriteria;

  @Column({ name: "usulan_pengembangan", type: "text", nullable: true })
  usulanPengembangan: string;
}
