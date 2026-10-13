import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!confirmPassword) {
    return null;
  }
  if (password?.value !== confirmPassword?.value) {
    return {
      passwordMismatch: true
    }
  }
  return null;
}