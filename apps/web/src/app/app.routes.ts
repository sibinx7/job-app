import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Profile } from './pages/profile/profile';
import { AdminModule } from './admin/admin-module';
import { adminAuthGuard } from './admin-auth-guard';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule),
    canActivateChild: [
      adminAuthGuard
    ]
  },
];
