import { Component, inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { AuthStore } from '../../../auth/auth.store';
import { UserRole } from '@job-app/shared';
import { IUser } from '../../../interfaces/iUser';

@Component({
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  constructor(private authService: AuthService) { }

  public readonly authStore = inject(AuthStore);
  private router = inject(Router);

  ngOnInit() {
    const token = this.authStore.token();
    const user = this.authStore.user();
    if (token && user) {
      const role = (user as IUser)?.role as UserRole ?? UserRole.JOB_SEEKER;
      this.redirectRoleNavigation(role);
    }
    switch (this.router.url) {
      case '/login':
        this.loginForm.get('role')?.setValue(UserRole.JOB_SEEKER);
        break;
      case '/company-login':
        this.loginForm.get('role')?.setValue(UserRole.COMPANY_STAFF);
        break;
      case '/admin-login':
        this.loginForm.get('role')?.setValue(UserRole.ADMIN);
        break;
    }
  }


  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/),
    ]),
    role: new FormControl<string>('JOB_SEEKER', [Validators.required]),
    remember: new FormControl<boolean>(false),
  });

  loginSubmit() {
    this.loginForm.markAllAsTouched();
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return false;
    }

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res?.access_token && res?.user) {
          this.authStore.setUserAndToken(res?.access_token, res?.user);
          const role = res?.user?.role;
          this.redirectRoleNavigation(role);
        }
        // Save access_token and user information
      },
      (error) => {
        console.log(error);
      },
    );
    return true;
  }

  isInavlid(name: string) {
    const selectedField = this.loginForm.get(name);
    return (
      !!selectedField && selectedField.invalid && (selectedField?.dirty || selectedField?.touched)
    );
  }

  /**
   * @description Redirects the user to the appropriate dashboard based on their role.
   * @param role The user's role.
   */
  redirectRoleNavigation(role: UserRole) {
    switch (role) {
      case UserRole.JOB_SEEKER:
        this.router.navigate(['/dashboard']);
        break;
      case UserRole.COMPANY_STAFF:
        this.router.navigate(['/company/dashboard']);
        break;
      case UserRole.ADMIN:
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/dashboard']);
        break;
    }
  }
}
