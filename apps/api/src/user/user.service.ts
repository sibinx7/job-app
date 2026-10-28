import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entity/user.entity.js';
import { Repository } from 'typeorm';
import { UserRole } from '@job-app/shared';
import CompanyStaff from '../entity/company_staff.entity.js';
import Company from '../entity/company.entity.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * @description Get all Users
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   * @description Get all Job Seekers
   */
  findJobSeekers() {
    return this.userRepository.find({ where: { role: UserRole.JOB_SEEKER } });
  }


  async findByUsername(username: string) {
    console.log('Username', username)
    if (!username) return null;
    return this.userRepository.findOne({
      where: { email: username },
      relations: {
        companyStaff: {
          company: true
        }
      }
    });
  }

  async create(user: Partial<User>) {
    const userData = this.userRepository.create(user)
    return this.userRepository.save(userData);
  }
}

