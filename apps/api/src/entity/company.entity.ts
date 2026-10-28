import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type CompanyStaff from "./company_staff.entity.js";

@Entity('Company')
export default class Company {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  country_code: number

  @Column()
  country: string

  @Column()
  pincode: string

  @Column()
  state: string

  @Column()
  employee_count: number

  @Column()
  website: string

  @Column()
  description: string

  @Column()
  address: string

  @Column()
  address_line_1: string

  @Column()
  address_line_2: string

  @Column()
  company_code: string

  @Column()
  registration_number: string

  @Column()
  logo_url: string

  @Column()
  company_logo: string

  @OneToMany('CompanyStaff', (company_staff: CompanyStaff) => company_staff.company)
  company_staff: CompanyStaff[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({
    nullable: true
  })
  deleted_at?: Date





}