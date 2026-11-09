import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyJobsService } from './company-jobs.service.js';
import { CreateCompanyJobDto } from './dto/create-company-job.dto.js';
import { UpdateCompanyJobDto } from './dto/update-company-job.dto.js';

@Controller('company-jobs')
export class CompanyJobsController {
  constructor(private readonly companyJobsService: CompanyJobsService) {}

  @Post()
  create(@Body() createCompanyJobDto: CreateCompanyJobDto) {
    return this.companyJobsService.create(createCompanyJobDto);
  }

  @Get()
  findAll() {
    return this.companyJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyJobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyJobDto: UpdateCompanyJobDto) {
    return this.companyJobsService.update(+id, updateCompanyJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyJobsService.remove(+id);
  }
}
