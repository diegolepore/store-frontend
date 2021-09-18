import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from '../store/auth/auth.actions'
import * as userActions from '../store/user/user.actions'
import * as cartActions from '../store/cart/cart.actions'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userState$!: Observable<{ user: any}>
  cartState$!: Observable<any>
  user!: any
  cart: any[] = []

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private store: Store<{userState: any, cartState: any[]}>
  ) { }

  ngOnInit(): void {
    this.userState$ = this.store.pipe(select('userState'))
    this.userState$.subscribe((res) => this.user = res.user )
    this.cartState$ = this.store.pipe(select('cartState'))
    this.cartState$.subscribe((res) => this.cart = res.cart )
  }

  ngOnChanges(): void {
    console.log('change')
  }

  logOut(): void {
    this.cookieService.delete('token')
    this.store.dispatch(authActions.logout())
    this.store.dispatch(userActions.clearUserState())
    this.store.dispatch(cartActions.clearCartState())
    this.router.navigate(['/login'])
  }
}
