import { PartialType } from '@nestjs/swagger';
import { CreateCompanyJobDto } from './create-company-job.dto.js';

export class UpdateCompanyJobDto extends PartialType(CreateCompanyJobDto) {}
