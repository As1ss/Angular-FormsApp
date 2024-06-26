import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';


const rtx5090= {
  name: "RTX 5090",
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})


export class BasicPageComponent implements OnInit{

  // public myForm:FormGroup = this.fb.group({
  //   name:"",
  //   price:0,
  //   inStorage:0
  // })

  public myForm: FormGroup = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(3)]),
    price: new FormControl(0,[Validators.required,Validators.min(0)]),
    inStorage: new FormControl(0,[Validators.required,Validators.min(0)]),
  });

  constructor(
    private fb:FormBuilder,
    private validatorsService:ValidatorsService){
  }
  ngOnInit(): void {
  //  this.myForm.reset(rtx5090)
  }

  ifsValidField(field:string):boolean | null{

    return this.validatorsService.isValidField(this.myForm,field);

  }

  getFieldError(field:string):string | null{

   return this.validatorsService.getFieldError(this.myForm,field);
  }

  onSave():void{

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      price: 0 , inStorage: 0
    });
  }

}
