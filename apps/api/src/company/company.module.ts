import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from '../entity/company.entity.js';
import { CompanyService } from './company.service.js';
import { CompanyJobsModule } from './company-jobs/company-jobs.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    CompanyJobsModule,
  ],
  providers: [CompanyService],
  exports: [CompanyService],

})
export class CompanyModule { }
