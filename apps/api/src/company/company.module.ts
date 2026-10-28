import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from '../entity/company.entity.js';
import { CompanyService } from './company.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
  ],
  providers: [CompanyService],
  exports: [CompanyService],

})
export class CompanyModule { }
