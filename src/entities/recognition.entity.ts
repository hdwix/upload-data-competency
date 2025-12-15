import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "prf_recognition",
  schema: "hcis_monitoring_prod",
  synchronize: false,
})
export class Recognition {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "document_id" })
  documentId: number;

  @Column("text", { name: "result" })
  result: string;

  @Column("int", { name: "rating" })
  rating: number;

  @Column("text", { name: "rating_desc" })
  ratingDesc: string;

  @Column("int", { name: "month" })
  month: number;

  @Column("text", { name: "created_by" })
  createdBy: string;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("text", { name: "updated_by" })
  updatedBy: string;

  @Column("datetime", { name: "updated_at" })
  updatedAt: Date;

  @Column("text", { name: "attachment_name" })
  attachmentName: string;

  @Column("text", { name: "attachment_size" })
  attachmentSize: string;

  @Column("text", { name: "attachment_type" })
  attachmentType: string;
}
