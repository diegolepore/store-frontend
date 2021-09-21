import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Product } from '../../models/Product'
import { CartProduct } from 'src/app/models/CartProduct'
import { CartService } from '../../services/api/cart/cart.service'
import { ProductsService } from 'src/app/services/api/products/products.service'
import { Auth } from '../../models/Auth'
import { User } from 'src/app/models/User'

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
  userState$!: Observable<{ user: User}>
  quantity = 0
  access_token = ''
  user!: User

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private store: Store<{ userState: { user: User }, authState: Auth}>
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
    this.userState$ = this.store.pipe(select('userState'))
    this.userState$.subscribe((res) => this.user = res.user )
    // this.getProductsInOrder()
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
      quantity: this.quantity,
      userId: this.user.id
    }

    this.cartService.getAllProductsInCart().subscribe((res) => {
      const cartItemsRes = res as unknown as CartProduct[]
      const isItemInCard = cartItemsRes.find((cartItem) => {
        return cartItem.product_id === this.product.id && cartItem.user_id === this.user.id
      })
      if(isItemInCard){
        this.productAddedToCart.emit({ message: 'This product is already in the cart' })
        window.scrollTo(0, 0)
      } else {
        this.cartService.addToCart(cartPayload).subscribe((res) => {
          this.productAddedToCart.emit(res)
          console.log(res)
          window.scrollTo(0, 0)
        })
      }
    })
  }
}
