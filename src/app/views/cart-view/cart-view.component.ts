import { Component, OnInit } from '@angular/core'
import { CartService } from '../../services/api/cart/cart.service'
import { OrdersService } from '../../services/api/orders/orders.service'
import { ProductsService } from 'src/app/services/api/products/products.service'
import { CartProduct } from 'src/app/models/CartProduct'
import { User } from 'src/app/models/User'
import { Product } from '../../models/Product'

// Store
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as cartActions from '../../store/cart/cart.actions'
import * as productsActions from '../../store/products/products.actions'

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
  isLoading = false
  userState$!: Observable<{ user: User}>
  user!: User
  productsState$!: Observable<{ products: Product[] }>;
  products!: Product[]

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private store: Store<{userState: { user: User }, productsState: { products: Product[] }}>
  ) { 
  }

  ngOnInit(): void {
    this.userState$ = this.store.pipe(select('userState'))
    this.userState$.subscribe((res) => this.user = res.user )
    this.productsService.getProductsList().subscribe((res) => {
      this.store.dispatch(productsActions.setProducts({products: res}))
      this.productsState$ = this.store.pipe(select('productsState'))
      this.productsState$.subscribe((res) => this.products = res.products)
      this.getProductsInOrder()
      this.getCartTotalPrice()
    })
  }

  // getProductsInOrder(): void {
  //   this.isLoading = true
  //   this.cartService.currentOrderByUser().subscribe((res) => {
  //     this.cartArr = (res as unknown) as CartProduct[]
  //     // this.store.dispatch(cartActions.setProductsInCart({cart: res}))
  //     this.getCartTotalPrice()
  //     this.isLoading = false
  //   })
  // }

  getAuthUserCart(res: unknown): CartProduct[] {
    const allProductsInCart = (res as unknown) as []
    return allProductsInCart.filter((cartItem: { user_id: number }) => {
      return cartItem.user_id === this.user.id 
    })  
  }

  getProductsInOrder(): void {
    this.isLoading = true
    this.cartService.getAllProductsInCart().subscribe((res) => {
      
      const authUserCart = this.getAuthUserCart(res)

      const userCart: CartProduct[] = []

      authUserCart.forEach((cartItem: { product_id: number }) => {
        const cartProd = this.products.filter((prod) => prod.id === cartItem.product_id) as unknown as CartProduct[]
        const cartAndProductDetail = {
          ...cartItem,
          image_url: cartProd[0].image_url,
          price: cartProd[0].price,
          name: cartProd[0].name
        } as CartProduct

        userCart.push(cartAndProductDetail)
      })

      this.cartArr = userCart
      this.store.dispatch(cartActions.setProductsInCart({cart: userCart}))
      this.getCartTotalPrice()
      this.isLoading = false
    })
  }

  getCartTotalPrice(): void {
    const prices = this.cartArr.map((productInCart: { price: number; quantity: number }) => {
      return productInCart.price * productInCart.quantity
    })
    
    this.cartTotalPrice = prices.reduce((partial_sum: number, a: number) => partial_sum + a, 0)
  }

  deleteProductFromCart(payload: { cart_item_id: number }): void {
    const { cart_item_id } = payload

    this.isLoading = true
    this.cartService.deleteProductFromCart(cart_item_id).subscribe(() => {
      this.getProductsInOrder()
      this.isLoading = false
    })
  }

  completeOrder(): void {
    this.isLoading = true
    this.cartService.getAllProductsInCart().subscribe((res) => {
      const authUserCart = this.getAuthUserCart(res)
      this.ordersService.deleteItemsFromCart(authUserCart)
    })
  }

  productsQuantity(): number {
    return this.cartArr.length
  }

  setLoading(isLoading: boolean): void {
    this.isLoading = isLoading
  }
}
