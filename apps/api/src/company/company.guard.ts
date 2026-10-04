import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard.js';
import { CompanyService } from './company.service.js';


@Injectable()
export class CompanyGuard implements CanActivate {

  constructor(
    private readonly jwtAuthGuard: AuthGuard,
    private readonly companyService: CompanyService
  ) {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException();
    }
    if (request?.user?.role !== UserRoles.COMPANY_STAFF) {
      throw new ForbiddenException('You are not authorized to perform this action');
    }
    return true;
  }
}
