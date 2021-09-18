import { Injectable } from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'
import { Auth } from 'src/app/models/Auth'
import { UserService } from '../../api/user/user.service'

// Store
import { Store, select } from '@ngrx/store'
import * as authActions from '../../../store/auth/auth.actions'
import * as userActions from '../../../store/user/user.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  authState$!: Observable<Auth>

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private userService: UserService,
    private store: Store<{ authState: Auth }> 
  ) {
  }
  
  getAuthUser(): void {
    this.userService.getAuthUser().subscribe((res) => {
      this.store.dispatch(userActions.setUser({ user: res }))
    })
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.authState$ = this.store.pipe(select('authState'))
    const cookieToken = this.cookieService.get('token')
    let accessToken = ''
    
    this.authState$.subscribe((res) => accessToken = res.access_token )

    if(!accessToken) {
      if(cookieToken) {
        this.store.dispatch(authActions.login({access_token: cookieToken}))
        this.getAuthUser()
        // console.log('🚧 has NO token in store, but has token in cookies', accessToken)
        return true
      } else {
        // console.log('🚧 has NO token neither in store nor in cookies', accessToken)
        this.router.navigate(['/login'])
        return false
      }
    }

    // console.log('🚧 has token in store', accessToken)
    return true   
  }
}
