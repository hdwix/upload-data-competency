import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ECompetencyType } from "../enum/competency-type.enum";
import { EWorklistCategory } from "../enum/worklist.enum";

@Entity({ name: "prf_competency_config", synchronize: false })
export class PrfCompetencyConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "period_id", type: "int" })
  periodId: number;

  @Column({
    type: "enum",
    enum: EWorklistCategory,
  })
  category: EWorklistCategory;

  @Column({
    name: "competency_type",
    type: "enum",
    enum: ECompetencyType,
  })
  competencyType: ECompetencyType;

  @Column({
    name: "is_superior_required",
    type: "tinyint",
    width: 1,
    default: 0,
  })
  isSuperiorRequired: boolean;

  @Column({ name: "is_self_required", type: "tinyint", width: 1, default: 0 })
  isSelfRequired: boolean;

  @Column({ name: "is_peer_required", type: "tinyint", width: 1, default: 0 })
  isPeerRequired: boolean;

  @Column({
    name: "is_subordinate_required",
    type: "tinyint",
    width: 1,
    default: 0,
  })
  isSubordinateRequired: boolean;

  @Column({ name: "required_minimum", type: "tinyint", nullable: true })
  requiredMinimum: number;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;
}
