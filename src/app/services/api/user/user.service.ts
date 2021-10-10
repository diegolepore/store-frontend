import { Injectable } from '@angular/core'
import { User } from '../../../models/User'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Auth } from '../../../models/Auth'
import { Store, select } from '@ngrx/store'
import jwt_decode from 'jwt-decode'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string
  authState$!: Observable<Auth>
  access_token = ''
  headers!: HttpHeaders
  options!: { headers: HttpHeaders }

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ authState: Auth}>
  ) {
    this.baseUrl = environment.baseUrl
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => { 
      this.access_token = res.access_token 

      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.access_token}`
      })
      
      this.options = { headers: this.headers }
    })
  }

  getAuthUser(): Observable<User> {
    const decoded: { user: User } = jwt_decode(this.access_token)

    return this.httpClient.get<User>(`${this.baseUrl}/users/${decoded.user.id}`, this.options)
  }
}
