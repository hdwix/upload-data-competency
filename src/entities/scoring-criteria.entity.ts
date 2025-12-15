import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "prf_scoring_criteria", synchronize: false })
export class ScoringCriteria {
  @PrimaryColumn()
  id: number;

  @Column()
  period_id: number;

  @Column()
  min_score: number;

  @Column()
  max_score: number;

  @Column()
  criteria: string;
}
