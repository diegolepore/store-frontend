import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product'

// Services
import { ProductsService } from '../services/api/products/products.service';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as productsActions from '../store/products/products.actions'

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss']
})
export class ProductsListViewComponent implements OnInit {
  productsState$!: Observable<{ products: Product[] }>;
  products!: Product[]

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
          console.log('Products res: ', res)
          this.store.dispatch(productsActions.setProducts({products: res}))
          this.productsState$ = this.store.pipe(select('productsState'))
          this.productsState$.subscribe((res) => this.products = res.products )
        })
    }

    productsList() {
      console.log('this.productsState$', this.productsState$)
      return this.productsState$
    }

}
