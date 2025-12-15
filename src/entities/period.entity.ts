import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "prf_period", synchronize: false })
export class Period {
  @PrimaryColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column()
  start_date: string;

  @Column()
  end_date: string;
}
