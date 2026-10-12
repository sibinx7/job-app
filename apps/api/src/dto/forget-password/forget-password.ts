import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgetPassword {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string

}
