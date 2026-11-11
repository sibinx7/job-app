import { MAX } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Company from "./company.entity.js";
import User from "./user.entity.js";
import { JobType  } from '../../../../packages/shared/dist/enums/job.enum.js'



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
  @Column({ name: 'experience_min', type: 'number' })
  experienceMin: number
  @Column({ name: 'experience_max', type: 'number' })
  experienceMax: number

  @Column({ name: 'is_hybrid', type: 'bit', default: true })
  isHybrid: boolean

  @Column({ name: 'is_onsite', type: 'bit', default: false })
  isOnsite: boolean

  @Column({ name: 'is_remote', type: 'bit', default: false })
  isRemote: boolean

  @Column({ name: 'job_type', type: 'nvarchar', length: 100, nullable: false })
  jobType: JobType

  @Column({ name: 'notice_period_min', type: 'number' })
  noticePeriodMin: number

  @Column({ name: 'notice_period_max', type: 'number' })
  noticePeriodMax: number

  @Column({ name: 'salary_min', type: 'number' })
  salaryMin: number

  @Column({ name: 'salary_max', type: 'number' })
  salaryMax: number


  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({
    nullable: true
  })
  deleted_at?: Date


}
