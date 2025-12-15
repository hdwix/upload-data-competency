import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "employee", synchronize: false })
export class Employee {
  @PrimaryColumn()
  person_id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  nik: string;

  @Column()
  nama: string;

  @Column()
  title: string;

  @Column()
  tanggal_masuk: string;

  @Column()
  employee_category: string;

  @Column()
  organization: string;

  @Column()
  job: string;

  @Column()
  band: string;

  @Column()
  location: string;

  @Column()
  kota: string;

  @Column()
  no_hp: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  status_pernikahan: string;

  @Column()
  agama: string;

  @Column()
  tgl_lahir: string;

  @Column()
  start_date_assignment: string;

  @Column()
  admins: string;

  @Column()
  nik_atasan: string;

  @Column()
  nama_atasan: string;

  @Column()
  medical_admin: string;

  @Column()
  section: string;

  @Column()
  department: string;

  @Column()
  division: string;

  @Column()
  bgroup: string;

  @Column()
  egroup: string;

  @Column()
  directorate: string;

  @Column()
  area: string;

  @Column()
  tgl_masuk: string;

  @Column()
  status: string;

  @Column()
  status_employee: string;

  @Column()
  start_date_status: string;

  @Column()
  end_date_status: string;

  @Column()
  kota_lahir: string;

  @Column()
  bp: string;

  @Column()
  bi: string;

  @Column()
  edu_lvl: string;

  @Column()
  edu_faculty: string;

  @Column()
  edu_major: string;

  @Column()
  edu_institution: string;

  @Column()
  posisi: string;

  @Column()
  last_update_date: string;

  @Column()
  salary: number;

  @Column()
  tunjangan: number;

  @Column()
  tunjangan_jabatan: number;

  @Column()
  tunjangan_rekomposisi: number;

  @Column()
  structural: string;

  @Column()
  functional: string;

  @Column()
  no_ktp: string;

  @Column()
  suku: string;

  @Column()
  golongan_darah: string;

  @Column()
  no_npwp: string;

  @Column()
  alamat: string;

  @Column()
  nama_ibu: string;

  @Column()
  dpe: string;

  @Column()
  kode_kota: string;

  @Column()
  position_id: number;

  @Column()
  timezone: string;

  @Column()
  job_category: string;

  @Column()
  job_id: number;

  @Column()
  area_group: string;

  @Column()
  homebase: string;

  @Column()
  organization_id: number;

  @Column()
  reason: string;
}
