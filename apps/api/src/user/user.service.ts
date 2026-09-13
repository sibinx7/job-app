import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity.js';
import { Repository } from 'typeorm';
import { UserRole } from '@job-app/shared';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  /**
   * @description Get all Users
   */
  findAll(){
    return this.userRepository.find();
  }

  /**
   * @description Get all Job Seekers
   */
  findJobSeekers(){
    return this.userRepository.find({ where: { role: UserRole.JOB_SEEKER } });
  }
}
