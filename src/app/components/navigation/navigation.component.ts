import { Component, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { User } from 'src/app/models/User'
import { CartProduct } from 'src/app/models/CartProduct'

// Store
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as authActions from '../../store/auth/auth.actions'
import * as userActions from '../../store/user/user.actions'
import * as cartActions from '../../store/cart/cart.actions'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userState$!: Observable<{ user: User}>
  cartState$!: Observable<{ cart: CartProduct[]}>
  user!: User
  cart: CartProduct[] = []

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private store: Store<{userState: { user: User }, cartState: { cart: CartProduct[]}}>
  ) { }

  ngOnInit(): void {
    this.userState$ = this.store.pipe(select('userState'))
    this.userState$.subscribe((res) => this.user = res.user )
    this.cartState$ = this.store.pipe(select('cartState'))
    this.cartState$.subscribe((res) => this.cart = res.cart )
  }

  logOut(): void {
    this.cookieService.delete('token')
    this.store.dispatch(authActions.logout())
    this.store.dispatch(userActions.clearUserState())
    this.store.dispatch(cartActions.clearCartState())
    this.router.navigate(['/login'])
  }
}
