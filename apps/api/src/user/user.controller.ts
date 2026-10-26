import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserGuard } from './user.guard.js';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard.js';

@Controller('user')
@UseGuards(JwtAuthGuard, UserGuard)
export class UserController {

  constructor(private readonly userService: UserService) { }


  @Get('/applied-jobs')
  async getCurrentUserAppliedJobs() {

  }
}
