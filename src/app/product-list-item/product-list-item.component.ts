import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/api/cart/cart.service';
import { Auth } from '../models/Auth';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  authState$!: Observable<Auth>
  quantity: number = 0
  access_token: string = ''

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
  }

  stepDown() {
    if( this.quantity > 1 ) {
      this.quantity = --this.quantity
    }
  }

  stepUp() {
    this.quantity = ++this.quantity
  }

  addToCart(product: Product): void {
    console.log(product, this.access_token)
    const cartPayload = {
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.addToCart(cartPayload, this.access_token).subscribe((res) => {
      console.log('ADD TO CART response: ', res)
    })
  }
}
