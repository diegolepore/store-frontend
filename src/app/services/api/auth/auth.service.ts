import { Injectable } from '@angular/core'
import { User } from '../../../models/User'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
})

const options = { headers: headers }

type Register = { first_name: string, last_name: string, email: string, pass: string }
type RegisterResponse = { id: number, first_name: string, last_name: string, email: string }

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
