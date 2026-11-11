import { Entity, OneToMany, PrimaryGeneratedColumn, Many } from "typeorm/browser";

@Entity('CompanySkill')
export class CompanySkill {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne('Company')


  @ManyToOne('')


}
