import { MAX } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Company from "./company.entity.js";
import User from "./user.entity.js";


@Entity('Job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'nvarchar', length: 255 })
  title: string

  @Column({ type: 'nvarchar', length: MAX, nullable: false })
  description: string

  // Map Company
  @ManyToOne('Company', (company: any) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: Company
  @Column({name: 'company_id'})
  companyId: number

  @ManyToOne('User', (user: any) => user.jobs)
  @JoinColumn({ name: 'posted_by_id' })
  user: User

  @Column({ name: 'posted_by_id' })
  postedById: number

  // Experience
  @Column({ name: 'experience_min' })
  experienceMin: number
  @Column({ name: 'experience_max' })
  experienceMax: number

  @Column({ name: 'is_hybrid', type: 'bit', default: true })
  isHybrid: boolean

  @Column({ name: 'is_onsite', type: 'bit', default: false })
  isOnsite: boolean

  @Column({ name: 'is_remote', type: 'bit', default: false })
  isRemote: boolean
}
