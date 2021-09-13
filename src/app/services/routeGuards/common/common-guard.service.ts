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

import { UserService } from '../../api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommonGuardService implements CanActivate {

  authState$!: Observable<Auth>
  userState$!: Observable<{}>

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private userService: UserService,
    private store: Store<{ authState: Auth, userState: any }>
  ) {}

  getAuthUser(access_token: string): void {
    const decoded = (jwt_decode(access_token) as unknown) as any;

    this.userService.getAuthUser(decoded.user.id, access_token).subscribe((res) => {
      this.store.dispatch(userActions.setUser({ user: res }))
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authState$ = this.store.pipe(select('authState'))
    this.userState$ = this.store.pipe(select('userState'))
    const cookieToken = this.cookieService.get('token')
    let accessToken = ''
    
    this.authState$.subscribe((res) => accessToken = res.access_token )

    if(!accessToken) {
      if(cookieToken) {
        if(state.url === '/login' || state.url === "/register") {
          this.router.navigate([this.router.url])
          return false
        }
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
