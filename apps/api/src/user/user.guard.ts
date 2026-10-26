import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service.js';
import { UserRole } from '@job-app/shared';


@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    const existingUser = await this.userService.findById(user?.id);
    if (existingUser?.id !== user?.id) {
      throw new UnauthorizedException()
    }
    if (existingUser?.role !== UserRole.JOB_SEEKER) {
      throw new ForbiddenException('Only Job Seekers can see his applied jobs')
    }
    return true;
  }
}
