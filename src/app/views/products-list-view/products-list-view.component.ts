import { Component, OnInit } from '@angular/core'
import { Product } from '../../models/Product'
import { CartProduct } from 'src/app/models/CartProduct'

// Services
import { ProductsService } from '../../services/api/products/products.service'

// Store
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as productsActions from '../../store/products/products.actions'

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss']
})
export class ProductsListViewComponent implements OnInit {
  productsState$!: Observable<{ products: Product[] }>;
  products!: Product[]
  showAddToCartAlert = false;
  productAlreadyInCartMessage = '';

  constructor(
    private productsService: ProductsService,
    private store: Store<{ productsState: { products: Product[] } }>
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productsService.getProductsList()
      .subscribe((res) => {
        this.store.dispatch(productsActions.setProducts({products: res}))
        this.productsState$ = this.store.pipe(select('productsState'))
        this.productsState$.subscribe((res) => this.products = res.products )
      })
  }

  productAddedToCart(event: { res: CartProduct }): void {
    const { res } = event
    if(!(typeof res.id === 'undefined')) {
      this.showAddToCartAlert = true
      this.productAlreadyInCartMessage = ''
    } else {
      this.showAddToCartAlert = false
      this.productAlreadyInCartMessage = res.message
    }
  }
}
