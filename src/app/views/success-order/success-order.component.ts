import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import * as cartActions from '../../store/cart/cart.actions'

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss']
})
export class SuccessOrderComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(cartActions.clearCartState())
  }

}
