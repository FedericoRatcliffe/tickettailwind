import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { SendFormsService } from '../../auth/services/send-forms.service';
import { emailPattern, passwordPattern } from '../../auth/validators/validators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgClass
  ],
  providers:[
    SendFormsService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private sendFormService: SendFormsService, private router: Router) {

    this.formLogin = this.formBuilder.group({

      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40), Validators.pattern(emailPattern)]],

      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(passwordPattern)]],

    });
  }



  onSubmit() {

    if (this.formLogin.valid) {

      this.sendFormService.sendFormLogin(this.formLogin.value).subscribe({
        next: (response) => {


          if (response.status === 200) {

            this.router.navigate(['/mis-tickets']);

          } else {

            console.warn('Unexpected response status:', response);

          }

          //MANEJAR RESPUESTA EXITOSA
          // this.router.navigate(['/mis-tickets']);
          // alert(JSON.stringify(response));
          // console.log(response);
        },
        error: (error) => {
          console.warn(error);
        },
        complete: () => {
          console.info('Enviado con exito.');
        },
      });

    } else {
      console.warn('Datos no enviados, verifique los requisitos de los campos o contacte al administrador.');
    }

  }


  
  logoutBtn() {
    this.sendFormService.logout().subscribe({
      next: (response) => {
        if (response.status === 200) { // Handle successful logout response
          this.router.navigate(['/login']); // Redirect to login page
        } else {
          console.warn('Unexpected response status:', response.status);
        }
      },
      error: (error) => {
        console.warn(error); // Handle logout errors
      }
    });
  }
}
