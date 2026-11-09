import { Injectable } from '@nestjs/common';
import { CreateCompanyJobDto } from './dto/create-company-job.dto.js';
import { UpdateCompanyJobDto } from './dto/update-company-job.dto.js';

@Injectable()
export class CompanyJobsService {
  create(createCompanyJobDto: CreateCompanyJobDto) {
    return 'This action adds a new companyJob';
  }

  findAll() {
    return `This action returns all companyJobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyJob`;
  }

  update(id: number, updateCompanyJobDto: UpdateCompanyJobDto) {
    return `This action updates a #${id} companyJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyJob`;
  }
}
