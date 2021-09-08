import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {
  id: string

  constructor(private route: ActivatedRoute) {
    this.id = ''
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string
  }
}
