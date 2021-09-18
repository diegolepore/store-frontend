import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Auth } from '../../../models/Auth'
import { Store, select } from '@ngrx/store'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl: string
  authState$!: Observable<Auth>
  access_token = ''
  headers!: HttpHeaders
  options!: { headers: HttpHeaders }

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ authState: Auth}>
  ) {
    this.baseUrl = 'http://www.storefront-api.xyz:3030'
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

  changeOrderStatus(orderId: number, status: string): Observable<unknown> {    
    return this.httpClient.put(`${this.baseUrl}/orders/${orderId}`, { status }, this.options)
  }
}
