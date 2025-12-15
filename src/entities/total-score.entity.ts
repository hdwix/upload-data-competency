import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "prf_total_score", synchronize: false })
export class TotalScore {
  @PrimaryColumn()
  id: number;

  @Column()
  id_period: number;

  @Column()
  person_id: number;

  @Column()
  total_score: number;

  @Column()
  total_score_new: number;

  @Column()
  crossborder_score: number;
}
