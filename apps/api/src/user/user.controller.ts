import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Get('/job-seekers')
  async getAllJobSeekers(){
    return await this.userService.findJobSeekers();
  }
}
