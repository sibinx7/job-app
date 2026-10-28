import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entity/user.entity.js';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategy/jwt.strategy.js';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [UserController],
  providers: [JwtService, JwtStrategy, UserService,],
  exports: [PassportModule]
})
export class UserModule { }
