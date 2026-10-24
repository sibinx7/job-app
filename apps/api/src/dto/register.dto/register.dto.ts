import { UserGender, UserRole } from "@job-app/shared";
import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { PasswordExtraConditionMessage, PasswordExtraConditionRegex } from "../../utils/helper.js";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  @Matches(
    PasswordExtraConditionRegex,
    {
      message: PasswordExtraConditionMessage
    }
  )

  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  @Matches(
    PasswordExtraConditionRegex,
    {
      message: PasswordExtraConditionMessage
    }
  )

  confirmPassword: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsEnum(UserGender)
  @IsNotEmpty()
  gender: UserGender;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsInt()
  @IsNotEmpty()
  countryCode: number;


}
