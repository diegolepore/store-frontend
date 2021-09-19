import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Product } from '../../models/Product'
import { CartService } from '../../services/api/cart/cart.service'
import { Auth } from '../../models/Auth'

// Store
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as cartActions from '../../store/cart/cart.actions'
@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  @Output() productAddedToCart: EventEmitter<unknown> = new EventEmitter();
  authState$!: Observable<Auth>
  quantity = 0
  access_token = ''

  constructor(
    private cartService: CartService,
    private store: Store<{ authState: Auth}>
  ) {
    this.product = {
      id: 0,
      name: '',
      description: '',
      image_url: '',
      price: 0,
      category: ''
    },

    this.quantity = 1
  }

  ngOnInit(): void {
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token )
    this.getProductsInOrder()
  }

  stepDown(): void {
    if( this.quantity > 1 ) {
      this.quantity = --this.quantity
    }
  }

  stepUp(): void {
    this.quantity = ++this.quantity
  }

  addToCart(): void {
    const cartPayload = {
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.addToCart(cartPayload).subscribe((res) => {
      this.productAddedToCart.emit(res)
      this.getProductsInOrder()
      window.scrollTo(0, 0)
    })
  }

  getProductsInOrder(): void {
    if(this.access_token) {
      this.cartService.currentOrderByUser().subscribe((res) => {
        this.store.dispatch(cartActions.setProductsInCart({cart: res}))
      })
    }
  }
}
