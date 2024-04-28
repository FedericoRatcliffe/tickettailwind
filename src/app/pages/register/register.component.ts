import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';

import { emailPattern, passwordPattern } from '../../auth/validators/validators';
import { SendFormsService } from '../../auth/services/send-forms.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgClass
  ],
  providers: [
    SendFormsService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  formRegister: FormGroup;

  constructor(private formbuilder: FormBuilder, private sendFormService: SendFormsService) {

    //FORMULARIO
    this.formRegister = this.formbuilder.group({

      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40), Validators.pattern(emailPattern)]],

      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(passwordPattern)]],

    });

  }




  
  onSubmit() {

    if (this.formRegister.valid) {

      this.sendFormService.sendFormRegister(this.formRegister.value).subscribe({
        next: (response) => {
          //MANEJAR RESPUESTA EXITOSA
          alert(JSON.stringify(response));
        },
        error: (error) => {
          console.warn(error);
        },
        complete: () => {
          console.info('Enviado con exito.');
        },
      });

    } else {
      // console.log(this.formRegister.value)
      console.warn('Datos no enviados, verifique los requisitos o contacte al administrador.');
    }

  }
}
