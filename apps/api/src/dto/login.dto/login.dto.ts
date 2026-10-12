import { UserRole } from '@job-app/shared';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
