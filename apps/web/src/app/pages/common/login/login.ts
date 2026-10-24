import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  imports: [
    RouterLink, RouterLinkActive, ReactiveFormsModule
  ],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

  constructor(private authService: AuthService) {

  }


  loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/)
    ]),
    role: new FormControl<string>('JOB_SEEKER', [
      Validators.required,
    ]),
    remember: new FormControl<boolean>(false)
  })



  loginSubmit() {
    this.loginForm.markAllAsTouched();
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      return false;
    }

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      // Save access_token and user information 
    }, (error) => {
      console.log(error);
    })
    return true;
  }

  isInavlid(name: string) {
    const selectedField = this.loginForm.get(name);
    return !!selectedField && selectedField.invalid && (selectedField?.dirty || selectedField?.touched)
  }
}
