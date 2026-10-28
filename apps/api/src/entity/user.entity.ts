import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserGender, UserRole, UserStatus } from '@job-app/shared';
import type CompanyStaff from './company_staff.entity.js';



@Entity('User')
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column({
    nullable: true
  })
  middle_name?: string
  @Column()
  last_name: string

  @Column({
    unique: true
  })
  @Index({
    unique: true
  })
  email: string

  @Column()
  password_hash?: string

  @Column()
  phone: string

  @Column()
  dob: Date

  @Column({
    enum: UserGender,
    default: UserGender.MALE
  })
  gender?: string

  @Column()
  country_code: number

  @Column()
  pincode?: string

  @Column()
  country: string

  @Column()
  state: string

  @Column({
    enum: UserRole,
    default: UserRole.JOB_SEEKER
  })
  role?: string

  @Column({
    enum: UserStatus,
    default: UserStatus.INACTIVE
  })
  status?: string

  @OneToOne('CompanyStaff', (companyStaff: CompanyStaff) => companyStaff.user)
  companyStaff?: CompanyStaff

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({
    nullable: true
  })
  deleted_at?: Date
}