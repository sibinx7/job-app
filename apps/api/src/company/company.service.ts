import { Injectable } from '@nestjs/common';
import { Company } from '../entity/company.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: Repository<Company>
  ) { }

  async createCompany(company: Company) {
    return this.companyRepository.save(company);
  }

  async findAll() {
    return this.companyRepository.find();
  }

  async findById(id: number) {
    return this.companyRepository.findOne({ where: { id } });
  }

  async updateCompany(id: number, company: Company) {
    return this.companyRepository.update(id, company);
  }

  async deleteCompany(id: number) {
    return this.companyRepository.delete(id);
  }

}
