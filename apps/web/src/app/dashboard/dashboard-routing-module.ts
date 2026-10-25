import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'job-search',
    loadComponent: () => import('./pages/job-search/job-search').then((m) => m.JobSearch),
  },
  {
    path: 'applied-jobs',
    loadComponent: () => import('./pages/applied-jobs/applied-jobs').then((m) => m.AppliedJobs),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
