import { Injectable } from '@angular/core'
import { User } from '../../../models/User'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import sign from 'jwt-encode'

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
})

const options = { headers: headers }

type Login = { email: string, pass: string }
type Register = { first_name: string, last_name: string, email: string, pass: string }
type RegisterResponse = { id: number, first_name: string, last_name: string, email: string }

const getJWToken = (obj: User | undefined) => sign({...obj}, 'shhhhh')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://retoolapi.dev/y0FyTm'
  }

  utilityGetMockUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`)   
  }

  register(registerPayload: Register): Observable<RegisterResponse | unknown> {
    return this.httpClient.post(`${this.baseUrl}/users`, registerPayload, options)
  }
}
