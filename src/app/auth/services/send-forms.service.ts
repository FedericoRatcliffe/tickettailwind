import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { RegisterEntity } from '../interfaces/registerEntity.interface';

@Injectable({
  providedIn: 'root'
})
export class SendFormsService {

  baseUrl: string = 'http://localhost:3001';

  constructor(private http: HttpClient) { }


  sendFormRegister(data: RegisterEntity): Observable<RegisterEntity> {
    return this.http.post<RegisterEntity>(`${this.baseUrl}/auth/register`, data);
  }

  // sendFormLogin(data: RegisterEntity): Observable<RegisterEntity> {
  //   return this.http.post<RegisterEntity>(`${this.baseUrl}/auth/login`, data, { withCredentials: true });
  // }

  sendFormLogin(data: RegisterEntity): Observable<HttpResponse<RegisterEntity>> {

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json', withCredentials: 'true' });
    // return this.http.post<RegisterEntity>(`${this.baseUrl}/auth/login`, data, { headers, observe: 'response' });


    const headers = new HttpHeaders({ 'Content-Type': 'application/json', withCredentials: 'true' });
    return this.http.post<RegisterEntity>(`${this.baseUrl}/auth/login`, data, { headers, observe: 'response' });


    // { withCredentials: true }
  }


  logout(): Observable<HttpResponse<any>> { // Return type for logout response
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, null, { headers, observe: 'response' }); // Send empty body (optional)
  }


  // ESTE ENDPOINT TIENE QUE VERIFICAR SI EL USUARIO ESTA AUTENTICADO PARA QUE EL GUARD DE ACCESO
  // checkAuthentication(): Observable<boolean> {
  //   // Replace this with your actual authentication check logic
  //   // For example, you might want to check if a valid token exists in cookies or local storage
  //   return this.http.get<boolean>(`${this.baseUrl}/auth/check`).pipe(
  //     map(response => response.status === 200)
  //   );
  // }



}
