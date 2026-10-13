import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../utils/password-match.validator';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {


  registerForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/)
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/)
    ]),
  }, {
    validators: passwordMatchValidator
  });

  registerSubmit() {
    console.log(this.registerForm.value);
  }

  isInavlid(name: string) {
    const selectedField = this.registerForm.get('name');
    return !!selectedField && selectedField.invalid && (selectedField?.dirty || selectedField?.touched)
  }
}
