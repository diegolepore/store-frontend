import { Injectable } from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'
import { Auth } from 'src/app/models/Auth'
import { User } from 'src/app/models/User'
import { UserService } from '../../api/user/user.service'

// Store
import { Store, select } from '@ngrx/store'
import * as authActions from '../../../store/auth/auth.actions'
import * as userActions from '../../../store/user/user.actions'


@Injectable({
  providedIn: 'root'
})
export class CommonGuardService implements CanActivate {

  authState$!: Observable<Auth>
  userState$!: Observable<User>

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private userService: UserService,
    private store: Store<{ authState: Auth, userState: User }>
  ) {}

  getAuthUser(): void {
    this.userService.getAuthUser().subscribe((res) => {
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
        if(state.url === '/login' || state.url === '/register') {
          this.router.navigate([this.router.url])
          return false
        }
        this.store.dispatch(authActions.login({access_token: cookieToken}))
        this.getAuthUser()
        return true
      }
    } else {
        if(state.url === '/login' || state.url === '/register') {
          this.router.navigate([this.router.url])
          return false
        }
      return true
    }

    return true   
  }
}
