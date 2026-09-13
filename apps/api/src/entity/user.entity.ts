import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '@job-app/shared';

@Entity('User')
export class User{
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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({
    nullable: true
  })
  deleted_at?: Date
}