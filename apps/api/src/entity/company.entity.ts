import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Company')
export class Company {
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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({
    nullable: true
  })
  deleted_at?: Date
}