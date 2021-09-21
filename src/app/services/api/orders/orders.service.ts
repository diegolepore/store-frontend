import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Auth } from '../../../models/Auth'
import { Store, select } from '@ngrx/store'
import { CartProduct } from 'src/app/models/CartProduct'
import { Router } from '@angular/router'

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
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<{ authState: Auth}>
  ) {
    this.baseUrl = 'https://retoolapi.dev/cb2EpI'
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

  deleteItemsFromCart(authUserCart: CartProduct[]): void {  
    let i = 0
    const interval = setInterval(() => {
      if(i < authUserCart.length) {
        this.httpClient.delete(`https://retoolapi.dev/cb2EpI/cart/${authUserCart[i].id}`).subscribe()
      } else {
        clearInterval(interval)
        this.router.navigate(['/success-order'])
      }
      i++
    }, 1000)
  }
}
