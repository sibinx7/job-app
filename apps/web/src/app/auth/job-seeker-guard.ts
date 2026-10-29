import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { inject } from '@angular/core';
import { UserRole } from '../../../../../packages/shared/src/enums/user.enum';
import { IUser } from '../interfaces/iUser';

export const jobSeekerGuard: CanMatchFn = (route, segments) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const user = authStore.user() as IUser | null;
  if (user?.role === UserRole.JOB_SEEKER) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
