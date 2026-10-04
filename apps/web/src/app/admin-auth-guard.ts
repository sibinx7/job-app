import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from './auth/auth.store';


export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if(authStore.isAuthenticated() && authStore.isAdmin()){
    return true;
  }
  return router.navigate(['/login']);
};
