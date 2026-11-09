import { Module } from '@nestjs/common';
import { CompanyJobsService } from './company-jobs.service.js';
import { CompanyJobsController } from './company-jobs.controller.js';

@Module({
  controllers: [CompanyJobsController],
  providers: [CompanyJobsService],
})
export class CompanyJobsModule {}
