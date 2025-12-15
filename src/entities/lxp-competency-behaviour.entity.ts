// lxp-competency-behavior.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum EProficiencyLevel {
  BASIC = "Basic",
  INTERMEDIATE = "Intermediate",
  PROFICIENT = "Proficient",
  ADVANCED = "Advanced",
  MASTER = "Master",
}

@Entity({ name: "prf_lxp_competency_behavior", synchronize: false })
export class LxpCompetencyBehavior {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "competency_id", type: "int" })
  competencyId: number;

  @Column({
    name: "level",
    type: "enum",
    enum: EProficiencyLevel,
  })
  level: EProficiencyLevel;

  @Column({ name: "behavior_desc", type: "text" })
  behaviorDesc: string;

  @Column({ name: "lang", type: "varchar", length: 8, default: "ID" })
  lang: "ID" | "EN";

  @Column({ name: "level_order", type: "int", default: 0 })
  levelOrder: number;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;
}
