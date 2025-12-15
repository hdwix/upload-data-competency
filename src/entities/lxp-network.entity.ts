import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "prf_lxp_network", synchronize: false })
export class LxpNetwork {
  @PrimaryColumn({ name: "skill_id", type: "varchar", length: 10 })
  skillId: string;

  @Column({ name: "skill_name", type: "varchar", length: 100, nullable: true })
  skillName: string;

  @Column({
    name: "skill_category",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  skillCategory: string;

  @Column({ name: "assessed_proficiency", type: "int", nullable: true })
  assessedProficiency: number;

  @Column({
    name: "assessed_proficiency_str",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  assessedProficiencyStr: string;

  @Column({ name: "target_proficiency", type: "int", nullable: true })
  targetProficiency: number;

  @Column({
    name: "target_proficiency_str",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  targetProficiencyStr: string;

  @Column({ name: "user_nik", type: "varchar", length: 50, nullable: true })
  userNik: string;

  @Column({ name: "user_name", type: "varchar", length: 100, nullable: true })
  userName: string;

  @Column({ name: "start_date", type: "date", nullable: true })
  startDate: Date;

  @Column({ name: "end_date", type: "date", nullable: true })
  endDate: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}
