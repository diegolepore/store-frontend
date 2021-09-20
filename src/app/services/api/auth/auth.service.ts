import { Injectable } from '@angular/core'
import { Auth } from '../../../models/Auth'
import { User } from '../../../models/User'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { sign } from 'jsonwebtoken'
// import jwt from 'jsonwebtoken'
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

  // login(authPayload: Login): Observable<Auth> {
  //   return this.httpClient.post<Auth>(`${this.baseUrl}/users/auth`, authPayload, options)
  // }


  utilityGetMockUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`)   
  }


  // login(authPayload: Login): Observable<Auth> {
  login(authPayload: Login): string {
    // console.log(authPayload)
    // console.log(this.utilityGetMockUsers())
        console.log(authPayload)
        let token = ''
        this.utilityGetMockUsers().subscribe((res) => {
          const authUser = res.find((user) => {
            return user.email === authPayload.email
          })
          // console.log('authUser', authUser)
          console.log('getJWToken(authUser)', getJWToken(authUser))
          token = getJWToken(authUser)
        })
         
      return token
    // return this.httpClient.get<Auth>('https://mocki.io/v1/bf561b18-4a47-4991-a0ea-8af4dbfd03db')
    // return this.httpClient.post<Auth>(`${this.baseUrl}/users/auth`, authPayload, options)
  }

  register(registerPayload: Register): Observable<RegisterResponse | unknown> {
    return this.httpClient.post(`${this.baseUrl}/users`, registerPayload, options)
  }
}
