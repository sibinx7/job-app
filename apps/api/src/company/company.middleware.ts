import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service.js';
import { CompanyService } from './company.service.js';
import { UserRole, UserStatus } from '@job-app/shared';

@Injectable()
export class CompanyMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService
  ) {

  }
  use(req: Request, res: Response, next: NextFunction) {
    // If User not authenticated, throw error
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }
    // If User not company authenticated throw error
    const user: any = this.authService.authenticae(req as any);
    if (!user) {
      throw new UnauthorizedException();
    }
    // if the role is not company and admin 
    if (user.role !== UserRole.COMPANY_STAFF && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Company staff or admin required'
      );
    }
    if (!user?.company_id) {
      throw new ForbiddenException(
        'User is not assigned to any company'
      )
    }
    // check if the user is active 
    if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException(
        'User is not active'
      )
    }
    const company = await this.companyService.findById(user?.company_id);
    if (!company) {
      throw new ForbiddenException(
        'Company not found'
      )
    }
    req.user = user;
    req.company = company;
    next();
  }
}
