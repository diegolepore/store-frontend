import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Auth } from '../../../models/Auth';

// Store
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl: string
  authState$!: Observable<Auth>
  access_token: string = ''

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ authState: Auth}>
  ) {
    this.baseUrl = 'http://localhost:3030'
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token)
  }

  changeOrderStatus(orderId: string, status: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });

    let options = { headers: headers };
    
    return this.httpClient.put(`${this.baseUrl}/orders/${orderId}`, { status }, options)
  }
}