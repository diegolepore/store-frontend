import { Injectable } from '@angular/core'
import { Auth } from '../../../models/Auth'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
})

const options = { headers: headers }

type Login = { email: string, pass: string }
type Register = { first_name: string, last_name: string, email: string, pass: string }
type RegisterResponse = { id: number, first_name: string, last_name: string, email: string }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl
  }

  login(authPayload: Login): Observable<Auth> {
    return this.httpClient.post<Auth>(`${this.baseUrl}/users/auth`, authPayload, options)
  }

  register(registerPayload: Register): Observable<RegisterResponse | unknown> {
    return this.httpClient.post(`${this.baseUrl}/users`, registerPayload, options)
  }
}
