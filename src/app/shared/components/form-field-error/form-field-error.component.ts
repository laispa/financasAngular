import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl : FormControl
  
  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      return null;
  }

  private mustShowErrorMessage(): boolean{
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | null{ //caso nao tenha nenhum erro : null
    if(this.formControl.errors.required)
      return "Dado obrigatório";
    else if(this.formControl.errors.email)
      return "formato de email inválido";
    else if (this.formControl.errors.minlength){ //maxlenght tbm
      const requiredlength = this.formControl.errors.minlength.requiredLength 
      return `Deve ter no mínimo ${requiredlength} caracteres`;
    }
    else if (this.formControl.errors.maxlenght){ //maxlenght tbm
      const requiredLength = this.formControl.errors.maxlenght.requiredLength 
      return `Deve ter no máximo ${requiredLength} caracteres`

    }
  }
}
