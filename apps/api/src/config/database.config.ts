import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from "../entity/user.entity.js";
import Company from '../entity/company.entity.js';
import CompanyStaff from '../entity/company_staff.entity.js';


export default TypeOrmModule.forRoot({
  type: 'mssql',
  host: process.env.DATABASE_SERVER,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [
    User,
    Company,
    CompanyStaff
  ],
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  connectionTimeout: 15000
});