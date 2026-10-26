import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user';

@Component({
  imports: [],
  selector: 'app-applied-jobs',
  styleUrl: './applied-jobs.scss',
  templateUrl: './applied-jobs.html',
})
export class AppliedJobs implements OnInit {
  constructor(
    private userService: UserService
  ) {

  }

  public appliedJobs = signal([]);

  ngOnInit(): void {
    this.userService.getAppliedJobs().subscribe((res: any) => {
      this.appliedJobs.set(res)
    });
  }

}
