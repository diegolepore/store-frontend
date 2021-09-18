import { Component, OnInit } from '@angular/core'
import { CartService } from '../../services/api/cart/cart.service'
import { OrdersService } from '../../services/api/orders/orders.service'
import { Router } from '@angular/router'
import { CartProduct } from 'src/app/models/CartProduct'

// Store
import { Store } from '@ngrx/store'
import * as cartActions from '../../store/cart/cart.actions'

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  cartArr: CartProduct[] = []
  cartTotalPrice = 0
  access_token = ''
  nameOnCard = ''
  cardNumber = ''
  date = ''
  cvv = ''
  
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private store: Store
  ) { 
  }

  ngOnInit(): void {
    this.getProductsInOrder()
  }

  getProductsInOrder(): void {
    this.cartService.currentOrderByUser().subscribe((res) => {
      this.cartArr = (res as unknown) as CartProduct[]
      this.store.dispatch(cartActions.setProductsInCart({cart: res}))
      this.getCartTotalPrice()
    })
  }

  getCartTotalPrice(): void {
    const prices = this.cartArr.map((productInCart: { price: number; quantity: number }) => {
      return productInCart.price * productInCart.quantity
    })
    
    this.cartTotalPrice = prices.reduce((partial_sum: number, a: number) => partial_sum + a, 0)
  }

  deleteProductFromCart(payload: { order_id: number; product_id: number }): void {
    const { order_id, product_id } = payload

    this.cartService.deleteProductFromCart(order_id, product_id).subscribe(() => {
      this.getProductsInOrder()
    })
  }

  completeOrder(): void {
    this.ordersService.changeOrderStatus(this.cartArr[0].order_id, 'complete').subscribe(() => {
      this.router.navigate(['/success-order'])
    })
  }

  productsQuantity(): number {
    return this.cartArr.length
  }
}
