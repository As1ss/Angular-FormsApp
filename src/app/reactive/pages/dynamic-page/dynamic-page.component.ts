import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  // public myForm:FormGroup = new FormGroup({
  //   name: new FormControl(["",Validators.required,Validators.minLength(3)]),
  //   favoriteGames: new FormArray([
  // new FormControl("Metal Gear",Validators.required),
  // new FormControl("Death Stranding",Validators.required)
  //   ])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavoriteGame: FormControl = new FormControl(
    '',
    Validators.required
  );

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  ifsValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  onAddToFavorites(): void {
    if (this.newFavoriteGame.invalid) return;
    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset();
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  }
}
