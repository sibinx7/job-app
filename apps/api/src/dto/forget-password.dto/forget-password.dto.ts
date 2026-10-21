import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string
}
