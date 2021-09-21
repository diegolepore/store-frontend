import { Component, OnInit } from '@angular/core'
import { Product } from '../../models/Product'
import { CartProduct } from 'src/app/models/CartProduct'
import { User } from 'src/app/models/User'
import { Auth } from '../../models/Auth'

// Services
import { ProductsService } from '../../services/api/products/products.service'
import { CartService } from 'src/app/services/api/cart/cart.service'

// Store
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as productsActions from '../../store/products/products.actions'
import * as cartActions from '../../store/cart/cart.actions'

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss']
})
export class ProductsListViewComponent implements OnInit {
  productsState$!: Observable<{ products: Product[] }>;
  products!: Product[]
  showAddToCartAlert = false;
  productAlreadyInCartMessage: string | undefined = '';
  isLoading = false;
  userState$!: Observable<{ user: User}>
  user!: User
  authState$!: Observable<Auth>
  access_token = ''

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private store: Store<{ userState: { user: User }, productsState: { products: Product[] }, authState: Auth }>
  ) {}

  ngOnInit(): void {
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token )
    this.userState$ = this.store.pipe(select('userState'))
    this.userState$.subscribe((res) => this.user = res.user )
    this.getProducts()
  }

  getProducts(): void {
    this.isLoading = true
    this.productsService.getProductsList()
      .subscribe((res) => {
        this.store.dispatch(productsActions.setProducts({products: res}))
        this.productsState$ = this.store.pipe(select('productsState'))
        this.productsState$.subscribe((res) => this.products = res.products )
        this.getProductsInOrder()
        this.isLoading = false
      })
  }

  productAddedToCart(res: unknown): void {
    const response = (res as unknown) as CartProduct
    if(!(typeof response.id === 'undefined')) {
      this.showAddToCartAlert = true
      this.productAlreadyInCartMessage = ''
      this.getProductsInOrder()
    } else {
      this.showAddToCartAlert = false
      this.productAlreadyInCartMessage = response.message
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
