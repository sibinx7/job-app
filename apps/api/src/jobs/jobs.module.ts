import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { JobsController } from './jobs.controller.js';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
