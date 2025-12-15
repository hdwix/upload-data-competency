import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "prf_period_breakdown", synchronize: false })
export class PeriodBreakdown {
  @PrimaryColumn()
  id: number;

  @Column()
  period_id: number;

  @Column({ type: "date", nullable: true })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  end_date: Date;

  @Column()
  description: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @Column()
  period_start: string;

  @Column()
  period_end: string;

  @Column({ type: "date", nullable: true })
  competency_start_date: Date;

  @Column({ type: "date", nullable: true })
  competency_end_date: Date;

  @Column()
  culture_start_date: string;

  @Column()
  culture_end_date: string;
}
