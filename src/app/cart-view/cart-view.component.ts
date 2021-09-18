import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/api/cart/cart.service';
import { OrdersService } from '../services/api/orders/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  cartArr: any = []
  cartTotalPrice: number = 0
  access_token: string = ''
  nameOnCard: string = ''
  cardNumber: string = ''
  date: string = ''
  cvv: string = ''
  
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) { 
  }

  ngOnInit(): void {
    this.getProductsInOrder()
  }

  getProductsInOrder(): void {
    this.cartService.currentOrderByUser().subscribe((res) => {
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

    this.cartService.deleteProductFromCart(order_id, product_id).subscribe(() => {
      this.getProductsInOrder()
    })
  }

  completeOrder(): void {
    console.log('hey')
    this.ordersService.changeOrderStatus(this.cartArr[0].order_id, 'complete').subscribe(() => {
      this.router.navigate(['/success-order'])
    })
  }

  productsQuantity(): void {
    return this.cartArr.length
  }
}
