import { Injectable } from '@angular/core';
import { Auth } from '../../../models/Auth';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

let options = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3030'
  }

  login(authPayload: any): Observable<Auth> {
    return this.httpClient.post<Auth>(`${this.baseUrl}/users/auth`, authPayload, options)
  }

  register(registerPayload: any): Observable<any> {
    // FIX THE CORS PROBLEM
    // this.http.post('http://www.storefront-api.xyz:3030/users', this.form.getRawValue(), options) 
    return this.httpClient.post(`${this.baseUrl}/users`, registerPayload, options)
  }
}
