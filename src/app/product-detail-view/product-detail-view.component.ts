import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { Auth } from '../models/Auth';

// Services
import { ProductsService } from '../services/api/products/products.service';
import { CartService } from '../services/api/cart/cart.service';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cartActions from '../store/cart/cart.actions'
@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {
  id: string = ''
  product!: Product
  authState$!: Observable<Auth>
  quantity: number = 1
  access_token: string = ''
  showAddToCartAlert: boolean = false;
  productAlreadyInCartMessage: string = '';

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
        console.log('Product res: ', res)
        this.product = res
      })
  }

  stepDown() {
    if( this.quantity > 1 ) {
      this.quantity = --this.quantity
    }
  }

  stepUp() {
    this.quantity = ++this.quantity
  }

  addToCart(): void {
    const cartPayload = {
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.addToCart(cartPayload).subscribe((res) => {
      this.productAddedToCart(res)
      this.getProductsInOrder()
    })
  }

  productAddedToCart(res: any) {
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
