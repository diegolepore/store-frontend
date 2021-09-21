import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Auth } from '../../../models/Auth'

// Store
import { Store, select } from '@ngrx/store'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string
  authState$!: Observable<Auth>
  access_token = ''
  headers!: HttpHeaders
  options!: { headers: HttpHeaders }

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ authState: Auth}>
  ) {
    this.baseUrl = 'http://164.90.212.102:3030'
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

  // addToCart(cartPayload: { productId: number, quantity: number }): Observable<unknown> {    
  addToCart(cartPayload: { userId: number, productId: number, quantity: number }): Observable<unknown> {    
    const { productId, quantity, userId } = cartPayload
    
    return this.httpClient.post('https://retoolapi.dev/cb2EpI/cart', { product_id: productId, quantity, user_id: userId }, this.options)
    // return this.httpClient.post(`${this.baseUrl}/add-to-cart`, { productId, quantity }, this.options)
  }

  currentOrderByUser(): Observable<unknown> {
    return this.httpClient.get(`${this.baseUrl}/products-in-active-order`, this.options)
  }

  getAllProductsInCart(): Observable<unknown> {
    return this.httpClient.get<unknown>('https://retoolapi.dev/cb2EpI/cart')
  }

  // deleteProductFromCart(order_id: number, product_id: number): Observable<unknown> {
  deleteProductFromCart(cart_item_id: number): Observable<unknown> {
    return this.httpClient.delete(`https://retoolapi.dev/cb2EpI/cart/${cart_item_id}`)
  }

  changeProductQuantity(cart_item_id: number, quantity: number):  Observable<unknown> {
    return this.httpClient.patch(
      `https://retoolapi.dev/cb2EpI/cart/${cart_item_id}`,
      {
        quantity
      }
    )
  }
  
}
