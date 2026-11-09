import { Test, TestingModule } from '@nestjs/testing';
import { CompanyJobsController } from './company-jobs.controller.js';
import { CompanyJobsService } from './company-jobs.service.js';

describe('CompanyJobsController', () => {
  let controller: CompanyJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyJobsController],
      providers: [CompanyJobsService],
    }).compile();

    controller = module.get<CompanyJobsController>(CompanyJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
