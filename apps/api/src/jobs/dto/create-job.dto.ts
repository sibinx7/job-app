import {
  ArrayNotEmpty,
  IsArray, IsBoolean,
  IsEnum, IsIn,
  IsInt,
  isInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { JobType } from '@job-app/shared';


export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(JobType, {
    message: 'Invalid job type',
  })
  jobType: JobType;

  @IsNumber()
  @IsNotEmpty()
  salary_min: number;

  @IsNumber()
  @IsNotEmpty()
  salary_max: number;

  @IsNumber()
  @IsNotEmpty()
  experience_min: number;

  @IsNumber()
  @IsNotEmpty()
  experience_max: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  programing_languages: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  programing_frameworks: number[];

  @IsInt()
  @IsNotEmpty()
  company_id: number;

  @IsInt()
  @IsNotEmpty()
  posted_by_id: number;

  @IsBoolean()
  @IsNotEmpty()
  is_hybrid: boolean = true;

  @IsBoolean()
  @IsNotEmpty()
  is_remote: boolean = false;

  @IsBoolean()
  @IsNotEmpty()
  is_on_site: boolean = false;

  @IsNumber()
  @IsNotEmpty()
  notice_period_min: number;

  @IsNumber()
  @IsNotEmpty()
  notice_period_max: number;


  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  locations: number[]


}
