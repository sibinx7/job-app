import { Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from './auth/auth.store';


export const adminAuthGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformServer(platformId)) {
    return true;
  }
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated() && authStore.isAdmin()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
