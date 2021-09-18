import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Product } from '../../models/Product'
import { Auth } from '../../models/Auth'
import { CartProduct } from 'src/app/models/CartProduct'

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
  productAlreadyInCartMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private store: Store<{ authState: Auth}>
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token)

    this.getProduct(this.id)
    this.getProductsInOrder()
  }

  getProduct(id: string): void {
    this.productsService.getProductById(id)
      .subscribe((res) => {
        this.product = res
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
      quantity: this.quantity
    }

    this.cartService.addToCart(cartPayload).subscribe((res) => {
      const response = res as CartProduct
      
      this.productAddedToCart(response)
      this.getProductsInOrder()
    })
  }

  productAddedToCart(res: CartProduct): void {
    if(!(typeof res.id === 'undefined')) {
      this.showAddToCartAlert = true
      this.productAlreadyInCartMessage = ''
    } else {
      this.showAddToCartAlert = false
      this.productAlreadyInCartMessage = res.message
    }
  }

  getProductsInOrder(): void {
    this.cartService.currentOrderByUser().subscribe((res) => {
      this.store.dispatch(cartActions.setProductsInCart({cart: res}))
    })
  }
}
