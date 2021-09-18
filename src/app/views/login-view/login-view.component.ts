import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { Auth } from '../../models/Auth'
import { User } from 'src/app/models/User'

// Services
import { CookieService } from 'ngx-cookie-service'
import { AuthService } from '../../services/api/auth/auth.service'
import { UserService } from '../../services/api/user/user.service'

// Store
import { Store } from '@ngrx/store'
import * as authActions from '../../store/auth/auth.actions'
import * as userActions from '../../store/user/user.actions'

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  form!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<{ authState: Auth, userState: User}>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      pass: ''
    })
  }

  getAuthUser(): void {
    this.userService.getAuthUser().subscribe((res) => {
      this.store.dispatch(userActions.setUser({ user: res }))
    })
  }

  submitLogin(): void {
    this.authService.login(this.form.getRawValue()).subscribe((res) => {
      this.store.dispatch(authActions.login({access_token: res.access_token}))
      this.getAuthUser()
      this.cookieService.set('token', res.access_token)
      this.router.navigate(['/'])
    })
  }
}
