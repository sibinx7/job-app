import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../services/job';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthStore } from '../../auth/auth.store';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-post-job',
  styleUrl: './post-job.scss',
  templateUrl: './post-job.html',
})
export class PostJob implements OnInit {

  public authUser = inject(AuthStore)
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];
    if (jobId) {
      this.jobService?.getJob(jobId).subscribe((job) => {
        this.jobPost.patchValue(job);
      });
    }

  }

  readonly user = computed(() => this.authUser?.user())
  jobPost = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    locations: new FormControl<Array<Number>>([], Validators.required),
    salary_min: new FormControl<number>(0, Validators.required),
    salary_max: new FormControl<number>(0, Validators.required),
    jobType: new FormControl<string>('', Validators.required),
    experience_min: new FormControl<number>(0, Validators.required),
    experience_max: new FormControl<number>(0, Validators.required),
    programing_languages: new FormControl<string[]>([], Validators.required),
    programing_frameworks: new FormControl<string[]>([], Validators.required),
    company_id: new FormControl<number>(this?.user()?.id as any, Validators.required),
    posted_by_id: new FormControl<number>(this?.user()?.id as any, Validators.required),
    is_hybrid: new FormControl<boolean>(false),
    is_remote: new FormControl<boolean>(false),
    is_onsite: new FormControl<boolean>(false),
    notice_period_min: new FormControl<number>(0, Validators.required),
    notice_period_max: new FormControl<number>(0, Validators.required)

  })
}
