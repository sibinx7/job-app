import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./jobs/jobs').then((m) => m.Jobs)
  },
  {
    path: 'job',
    loadComponent: () => import('./job/job').then((m) => m.Job)
  },
  {
    path: 'post-job',
    loadComponent: () => import('./post-job/post-job').then((m) => m.PostJob)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
