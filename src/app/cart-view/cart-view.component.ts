import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/api/cart/cart.service';
import { Auth } from '../models/Auth';

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
  authState$!: Observable<Auth>
  access_token: string = ''

  constructor(
    private cartService: CartService,
    private store: Store<{ authState: Auth}>
  ) { }

  ngOnInit(): void {
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token)

    this.getProductsInOrder()
  }

  getProductsInOrder() {
    this.cartService.currentOrderByUser(this.access_token).subscribe((res) => {
      this.cartArr = res
    })
  }

  deleteProductFromCart(payload: any): void {

    const { order_id, product_id } = payload

    this.cartService.deleteProductFromCart(order_id, product_id, this.access_token).subscribe((res) => {
      this.getProductsInOrder()
    })
  }

  productsQuantity() {
    return this.cartArr.length
  }

}
