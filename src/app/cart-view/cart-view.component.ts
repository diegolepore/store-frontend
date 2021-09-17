import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/api/cart/cart.service';
import { OrdersService } from '../services/api/orders/orders.service';
import { Auth } from '../models/Auth';
import { Router } from '@angular/router';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  cartArr: any = []
  cartTotalPrice: number = 0
  authState$!: Observable<Auth>
  access_token: string = ''
  nameOnCard: string = ''
  cardNumber: string = ''
  date: string = ''
  cvv: string = ''
  

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private store: Store<{ authState: Auth}>
  ) { 
  }

  ngOnInit(): void {
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token)

    this.getProductsInOrder()
  }

  getProductsInOrder(): void {
    this.cartService.currentOrderByUser(this.access_token).subscribe((res) => {
      this.cartArr = res
      this.getCartTotalPrice()
      console.log(res)
    })
  }

  getCartTotalPrice(): void {
    const prices = this.cartArr.map((product: any) => {
      return product.price * product.quantity
    })
    
    this.cartTotalPrice = prices.reduce((partial_sum: number, a: number) => partial_sum + a, 0);
  }

  deleteProductFromCart(payload: any): void {

    const { order_id, product_id } = payload

    this.cartService.deleteProductFromCart(order_id, product_id, this.access_token).subscribe((res) => {
      this.getProductsInOrder()
    })
  }

  completeOrder(): void {
    this.ordersService.changeOrderStatus(this.cartArr[0].order_id, 'complete').subscribe((res) => {
      this.router.navigate(['/success-order'])
    })
  }

  productsQuantity(): void {
    return this.cartArr.length
  }
}
