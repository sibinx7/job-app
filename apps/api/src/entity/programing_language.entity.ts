import { MAX } from "mssql";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm/browser";

@Entity('Skill')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number 

  @Column({ type: 'nvarchar', length: MAX })
  name: string 

  @Column({ type: 'text' })
  description: string 

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date 

  @DeleteDateColumn({
    nullable: true 
  })
  deleted_at: Date 

}
