import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public isValidField(formGroup: FormGroup, field: string): boolean | null {
    return (
      formGroup.controls[field].errors && formGroup.controls[field].touched
    );
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }

  cantBeStrider(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = new RegExp('strider', 'i'); // "i" para hacerlo insensible a mayúsculas y minúsculas
      const value = control.value.trim().toLowerCase();
      const valid = pattern.test(value);

      return valid ? { noStrider: { value: control.value } } : null;
    };
  }

  firstNameAndLastnameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = new RegExp(this.firstNameAndLastnamePattern);
      const valid = pattern.test(control.value);
      return valid ? null : { invalidName: { value: control.value } };
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = new RegExp(this.emailPattern);
      const valid = pattern.test(control.value);
      return valid ? null : { invalidEmail: { value: control.value } };
    };
  }

  getFieldError(formGroup: FormGroup, field: string): string | null {
    if (!formGroup.controls[field]) return null;

    const errors = formGroup.controls[field].errors || {};

    for (const key in errors) {
      switch (key) {
        case 'required':
          return 'Valor requerido.';
        case 'minlength':
          return `El valor requerido debe tener mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'invalidName':
          return 'El valor debe estar compuesto por dos palabras.';
        case 'invalidEmail':
          return 'El email debe ser válido';
        case 'noStrider':
          return 'El usuario Strider ya existe';
      }
    }
    return null;
  }
}
