import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import { CartProduct } from '../../models/CartProduct'
import { CartService } from '../../services/api/cart/cart.service'


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() product: CartProduct;
  @Output() deleteCartItem: EventEmitter<{ order_id: number; product_id: number }> = new EventEmitter();
  @Output() totalPrice: EventEmitter<undefined> = new EventEmitter();
  itemTotalPrice = 0


  constructor(private cartService: CartService) {
    this.product = {
      product_id: 0,
      name: '',
      price: 0,
      image_url: '',
      order_status: '',
      quantity: 0,
      order_id: 0
    }
  }
  
  ngOnInit(): void {
    this.itemTotalPrice = this.product.quantity * this.product.price
  }
  
  deleteElementFromCart(): void {
    this.deleteCartItem.emit({order_id: this.product.order_id, product_id: this.product.product_id})
  }

  stepDown(): void {
    if( this.product.quantity > 1 ) {
      const productQuantity = this.product.quantity - 1

      this.cartService.changeProductQuantity(this.product.product_id, productQuantity).subscribe(() => {
        this.itemTotalPrice = this.product.quantity * this.product.price
        this.totalPrice.emit()
      })
    }
  }

  stepUp(): void {
    const productQuantity = this.product.quantity + 1
    
    this.cartService.changeProductQuantity(this.product.product_id, productQuantity).subscribe(() => {
      this.itemTotalPrice = this.product.quantity * this.product.price
      this.totalPrice.emit()
    })
  }

}
