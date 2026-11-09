import { Test, TestingModule } from '@nestjs/testing';
import { CompanyJobsService } from './company-jobs.service.js';

describe('CompanyJobsService', () => {
  let service: CompanyJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyJobsService],
    }).compile();

    service = module.get<CompanyJobsService>(CompanyJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
