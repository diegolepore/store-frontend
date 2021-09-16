import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;

  constructor() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      image_url: '',
      price: 0,
      category: ''
    }
  }

  ngOnInit(): void {
  }

}
