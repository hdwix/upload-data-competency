import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Document } from "./document.entity";
import { Monitoring } from "./monitoring.entity";

@Entity({ name: "prf_target", synchronize: false })
export class Target {
  @PrimaryColumn({ name: "id" })
  id: number;

  @Column({ name: "document_id" })
  documentId: number;

  @Column({ name: "target_requirement_id" })
  targetRequirementId: number;

  @Column({ name: "lib_target_id" })
  libTargetId: number;

  @Column({ name: "parent_target_id" })
  parentTargetId: number;

  @Column({ name: "target" })
  target: string;

  @Column({ name: "rules_type" })
  rulesType: string;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "created_at" })
  createdAt: string;

  @Column({ name: "created_by" })
  createdBy: number;

  @Column({ name: "updated_at" })
  updatedAt: string;

  @Column({ name: "updated_by" })
  updatedBy: number;

  @Column({ name: "control" })
  control: string;

  @Column({ name: "impact" })
  impact: string;

  @Column({ name: "strategic_inisiatif" })
  strategicInisiatif: string;

  @Column({ name: "addition" })
  addition: number;

  @Column({ name: "priority" })
  priority: string;

  @Column({ name: "progress" })
  progress: string;

  @Column({ name: "comment" })
  comment: string;

  @Column({ name: "flag_perubahan" })
  flagPerubahan: number;

  @Column({ name: "priority_temp" })
  priorityTemp: string;

  @Column({ name: "progress_temp" })
  progressTemp: string;

  @Column({ name: "comment_temp" })
  commentTemp: string;

  @Column({ name: "rules_type_temp" })
  rulesTypeTemp: string;

  @Column({ name: "target_temp" })
  targetTemp: string;

  @Column({ name: "okr_id" })
  okrId: string;

  @Column({ name: "okr_name" })
  okrName: string;

  @Column({ name: "dependency" })
  dependency: string;

  @Column({ name: "support_dependency" })
  supportDependency: string;

  @Column({ name: "target_okr" })
  targetOkr: string;

  @Column({ name: "start_date" })
  startDate: string;

  @Column({ name: "end_date" })
  endDate: string;

  @Column({ name: "level" })
  level: string;

  @Column({ name: "type" })
  type: string;

  @Column({ name: "project_id" })
  projectId: number;

  @Column({ name: "other_dir_subdir" })
  otherDirSubdir: string;

  @Column({ name: "other_okr_id" })
  otherOkrId: string;

  @Column({ name: "link_obj_kr_id" })
  linkObjKrId: number;

  @Column({ name: "link_obj_kr" })
  linkObjKr: string;

  @Column({ name: "individual_goal_category" })
  individualGoalCategory: string;

  @Column({ name: "parameter" })
  parameter: string;

  @Column({ name: "project_name" })
  projectName: string;

  @Column({ name: "parent_goal" })
  parentGoal: string;

  @ManyToOne(() => Document, (document) => document.targets)
  @JoinColumn({ name: "document_id" })
  document: Document;

  @OneToMany(() => Monitoring, (monitoring) => monitoring.target)
  monitorings: Monitoring[];
}
