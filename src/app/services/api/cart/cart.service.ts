import { Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3030'
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
}
