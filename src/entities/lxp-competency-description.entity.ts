import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum ELxpType {
  TECHNICAL = "technical",
  LEADERSHIP = "leadership",
}

@Entity({ name: "prf_lxp_competency_description", synchronize: false })
export class LxpCompetencyDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "type",
    type: "enum",
    enum: ELxpType,
    nullable: true,
  })
  type: ELxpType;

  @Column({ type: "varchar", length: 150, nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ name: "lang", type: "varchar", length: 8, default: "ID" })
  lang: "ID" | "EN";

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;
}
