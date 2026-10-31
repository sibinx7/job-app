import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Job')
export default class Job {
  @PrimaryGeneratedColumn()
  id: number


}
