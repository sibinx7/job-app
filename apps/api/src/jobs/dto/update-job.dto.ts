import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto.js';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsInt()
  @IsNotEmpty()
  id: number
}
