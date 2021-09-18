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
      });
      
      this.options = { headers: this.headers };
    })
  }

  addToCart(cartPayload: any): Observable<any> {    
    const { productId, quantity } = cartPayload
    
    return this.httpClient.post(`${this.baseUrl}/add-to-cart`, { productId, quantity }, this.options)
  }
  
  currentOrderByUser(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/products-in-active-order`, this.options)
  }

  deleteProductFromCart(order_id: string, product_id: string): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/delete-porduct-from-cart/order/${order_id}/product/${product_id}`, 
      this.options
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
