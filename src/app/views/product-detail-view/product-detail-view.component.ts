import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Product } from '../../models/Product'
import { Auth } from '../../models/Auth'
import { CartProduct } from 'src/app/models/CartProduct'
import { User } from 'src/app/models/User'

// Services
import { ProductsService } from '../../services/api/products/products.service'
import { CartService } from '../../services/api/cart/cart.service'

// Store
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as cartActions from '../../store/cart/cart.actions'
@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {
  id = ''
  product!: Product
  authState$!: Observable<Auth>
  quantity = 1
  access_token = ''
  showAddToCartAlert = false;
  productAlreadyInCartMessage: string | undefined = '';
  isLoading = false;
  userState$!: Observable<{ user: User}>
  user!: User

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private store: Store<{ userState: { user: User }, authState: Auth}>
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token)
    this.userState$ = this.store.pipe(select('userState'))
    this.userState$.subscribe((res) => this.user = res.user )
    this.getProduct(this.id)
  }

  getProduct(id: string): void {
    this.isLoading = true
    this.productsService.getProductById(id)
      .subscribe((res) => {
        this.product = res
        this.isLoading = false
        this.getProductsInOrder()
      })
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.productAddedToCart({ message: 'This product is already in the cart' })
        window.scrollTo(0, 0)
      } else {
        this.cartService.addToCart(cartPayload).subscribe((res) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          this.productAddedToCart(res)
          window.scrollTo(0, 0)
        })
      }
    })
  }

  productAddedToCart(res: CartProduct): void {
    if(!(typeof res.id === 'undefined')) {
      this.showAddToCartAlert = true
      this.productAlreadyInCartMessage = ''
      this.getProductsInOrder()
    } else {
      this.showAddToCartAlert = false
      this.productAlreadyInCartMessage = res.message
    }
  }

  getProductsInOrder(): void {
    if(this.access_token) {
      this.cartService.getAllProductsInCart().subscribe((res) => {
        const allProductsInCart = (res as unknown) as []
        const userCart = allProductsInCart.filter((cartItem: { user_id: number }) => {
          return cartItem.user_id === this.user.id 
        })        
        this.store.dispatch(cartActions.setProductsInCart({cart: userCart}))
      })
    }
  }
}
