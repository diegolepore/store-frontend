import { Injectable } from '@angular/core';
// AuthGuard Service
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";

import { Observable } from 'rxjs';

import { Auth } from 'src/app/models/Auth';

// Store
import { Store, select } from '@ngrx/store';
import * as authActions from '../../../store/auth/auth.actions'
import * as userActions from '../../../store/user/user.actions'

@Injectable({
  providedIn: 'root'
})
export class CommonGuardService implements CanActivate {

  authState$!: Observable<Auth>
  userState$!: Observable<{}>

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private store: Store<{ authState: Auth, userState: any }>
  ) {
    // console.log('this.router.url', this.router.url)
  }
  
  getAuthUser(access_token: string): void {
    const decoded = (jwt_decode(access_token) as unknown) as any;
    console.log('getUserRes: ', decoded.user)
    this.store.dispatch(userActions.setUser({ user: decoded.user }))
    
    console.log('this.userState$: ', this.userState$)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authState$ = this.store.pipe(select('authState'))
    this.userState$ = this.store.pipe(select('userState'))
    const cookieToken = this.cookieService.get('token')
    let accessToken = ''
    
    this.authState$.subscribe((res) => accessToken = res.access_token )

    // if(state.url === '/login' || state.url === "/register") {
    //   this.router.navigate([this.router.url])
    //   return false
    // }

    if(!accessToken) {
      if(cookieToken) {
        if(state.url === '/login' || state.url === "/register") {
          this.router.navigate([this.router.url])
          return false
        }
        // fetch user
        this.store.dispatch(authActions.login({access_token: cookieToken}))
        this.getAuthUser(cookieToken)
        return true
      }
    } else {
        if(state.url === '/login' || state.url === "/register") {
          this.router.navigate([this.router.url])
          return false
        }
      return true
    }

    return true   
  }
}
