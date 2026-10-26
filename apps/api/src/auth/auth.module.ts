import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
})
export class AuthModule {
  
}
