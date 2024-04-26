import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as CustomValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {


  public myForm:FormGroup = this.fb.group({
    name: ["",[Validators.required, this.validatorsService.firstNameAndLastnameValidator()]],
    email: ["",[Validators.required, this.validatorsService.emailValidator()],[this.emailValidator]],
    userName: ["",[Validators.required,this.validatorsService.cantBeStrider()]],
    password: ["",[Validators.required, Validators.minLength(6)]],
    password2: ["",[Validators.required]],
  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo("password","password2")
    ]
  });


  constructor(
    private validatorsService:ValidatorsService,
    private fb:FormBuilder,
    private emailValidator: EmailValidator
   ){}


  isValidField(field:string): boolean | null {

   return this.validatorsService.isValidField(this.myForm,field);

  }
  getFieldError(field:string):string | null {

    return this.validatorsService.getFieldError(this.myForm,field);
  }


  onSave(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }


    console.log(this.myForm.value);
  }
}
