import { Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Auth } from '../../../models/Auth';

// Store
import { Store, select } from '@ngrx/store';
@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  addToCart(cartPayload: any, accessToken: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    let options = { headers: headers };
    
    const { productId, quantity } = cartPayload
    
    return this.httpClient.post(`${this.baseUrl}/add-to-cart`, { productId, quantity }, options)
  }
  
  currentOrderByUser(accessToken: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    
    let options = { headers: headers };
    
    return this.httpClient.get(`${this.baseUrl}/products-in-active-order`, options)
  }

  deleteProductFromCart(order_id: string, product_id: string, accessToken: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    
    let options = { headers: headers };

    return this.httpClient.delete(
      `${this.baseUrl}/delete-porduct-from-cart/order/${order_id}/product/${product_id}`, 
      options
    )
  }

  changeProductQuantity(product_id: number, quantity: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    
    let options = { headers: headers };

    return this.httpClient.patch(
      `${this.baseUrl}/orders/edit-product-quantity`,
      {
        product_id,
        quantity
      },
      options
    )
  }
  
}
