import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type User from "./user.entity.js";
import type Company from "./company.entity.js";


@Entity('CompanyStaff')
export default class CompanyStaff {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @Column()
  user_id: number;

  @Column()
  role: string;

  @OneToOne('User', (user: User) => user.companyStaff)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne('Company', (company: Company) => company.company_staff)
  @JoinColumn({ name: 'company_id' })
  company: Company;

}
