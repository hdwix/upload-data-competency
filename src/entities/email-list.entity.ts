import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EmailType, EmailStatus } from "../enum/email-list.enum";

@Entity({ name: "prf_email_lists", synchronize: false })
export class EmailList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  trx_id: number;

  @Column({ type: "varchar", length: 100 })
  trx_name: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  subject: string;

  @Column({ type: "varchar", length: 125, nullable: true })
  email_to: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({
    type: "enum",
    enum: EmailType,
    default: EmailType.ORDINARY,
  })
  type: EmailType;

  @Column({
    type: "enum",
    enum: EmailStatus,
    default: EmailStatus.PENDING,
  })
  status: EmailStatus;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updated_at: Date;
}
