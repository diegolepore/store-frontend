import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { Auth } from '../models/Auth';

// Services
import { ProductsService } from '../services/api/products/products.service';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {
  id: string
  product!: Product
  authState$!: Observable<Auth>
  access_token: string = ''

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private store: Store<{ authState: Auth}>
  ) {
    this.id = ''
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string
    this.authState$ = this.store.pipe(select('authState'))
    this.authState$.subscribe((res) => this.access_token = res.access_token)

    this.getProduct(this.id)
  }

  getProduct(id: string): void {
    this.productsService.getProductById(id)
      .subscribe((res) => {
        console.log('Product res: ', res)
        this.product = res
      })
  }
}
