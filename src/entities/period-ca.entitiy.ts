import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "prf_period_ca", synchronize: false })
export class PeriodCa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  year: string;

  @Column({ type: "date", nullable: true })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  end_date: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  status: string;

  @CreateDateColumn({ type: "datetime", nullable: true })
  created_at: Date;

  @Column({ type: "int", nullable: true })
  created_by: number;

  @UpdateDateColumn({ type: "datetime", nullable: true })
  updated_at: Date;

  @Column({ type: "int", nullable: true })
  updated_by: number;
}
