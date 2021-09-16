import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';

// Services
import { ProductsService } from '../services/api/products/products.service';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {
  id: string
  product!: Product

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {
    this.id = ''
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string

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
