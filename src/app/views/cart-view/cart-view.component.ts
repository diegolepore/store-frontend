import { Component, OnInit } from '@angular/core'
import { CartService } from '../../services/api/cart/cart.service'
import { OrdersService } from '../../services/api/orders/orders.service'
import { ProductsService } from 'src/app/services/api/products/products.service'
import { Router } from '@angular/router'
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
    private router: Router,
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

  getProductsInOrder(): void {
    this.cartService.getAllProductsInCart().subscribe((res) => {
      const allProductsInCart = (res as unknown) as []
      const cart = allProductsInCart.filter((cartItem: { user_id: number }) => {
        return cartItem.user_id === this.user.id 
      })        

//       const cartArr = []

// product.image_url
// product.name
// product.quantity
// product.quantity
// product.quantity
// product.price

      const userCart: CartProduct[] = []

      cart.forEach((cartItem: { product_id: number }) => {
        // cartItem.product_id
        // console.log('cartItem', cartItem)
        const prod = this.products.filter((prod) => prod.id === cartItem.product_id) as unknown as CartProduct[]
        // console.log('prod', prod[0])
        const cartAndProductDetail = {
          ...cartItem,
          image_url: prod[0].image_url,
          price: prod[0].price
        } as CartProduct

        // console.log('cartAndProductDetail', cartAndProductDetail)
        userCart.push(cartAndProductDetail)
      })

      this.cartArr = userCart
      this.store.dispatch(cartActions.setProductsInCart({cart: userCart}))
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

    this.cartService.deleteProductFromCart(cart_item_id).subscribe(() => {
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
