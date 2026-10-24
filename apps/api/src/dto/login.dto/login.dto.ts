import { UserRole } from '@job-app/shared';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
