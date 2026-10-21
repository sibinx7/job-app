import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto/login.dto.js';
import { AuthService } from './auth.service.js';
import { ForgetPasswordDto } from '../dto/forget-password.dto/forget-password.dto.js';
import { RegisterDto } from '../dto/register.dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.regiser(registerDto);
  }
}

