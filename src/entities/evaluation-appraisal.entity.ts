import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "hcis_performance_prod.evaluation_appraisal",
  synchronize: false,
})
export class EvaluationAppraisal {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({ type: "int", name: "category_competence", nullable: false })
  categoryCompetence: number;

  @Column({ type: "text", nullable: false })
  competence: string;

  @Column({ type: "text", nullable: false })
  competence_en: string;

  @Column({ type: "text", nullable: false })
  guide_behavior: string;

  @Column({ type: "text", nullable: false })
  guide_behavior_en: string;

  @Column({ type: "int", nullable: false })
  status: number;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;
}
