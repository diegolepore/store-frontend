import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../models/Auth';
import jwt_decode from "jwt-decode";

// Services
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/api/auth/auth.service';
import { UserService } from '../services/api/user/user.service';

// Store
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from '../store/auth/auth.actions'
import * as userActions from '../store/user/user.actions'

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  form!: FormGroup;
  authState$!: Observable<Auth>
  userState$!: Observable<{}>

  constructor( 
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<{ authState: Auth, userState: any}>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      pass: ''
    })

    this.authState$ = this.store.pipe(select('authState'))
    this.userState$ = this.store.pipe(select('userState'))
  }

  getAuthUser(access_token: string): void {
      const decoded = (jwt_decode(access_token) as unknown) as any;
      console.log('getUserRes: ', decoded.user)
      this.store.dispatch(userActions.setUser({ user: decoded.user }))
      
      console.log('this.userState$: ', this.userState$)

      
      // this.userService.getAuthUser(decoded.user.id, access_token).subscribe((getUserRes) => {
      //   console.log('getUserRes: ', getUserRes)
      //   // this.store.dispatch(userActions.setUser({access_token: res.access_token}))
      // })
  }

  submitLogin(): void {

    this.authService.login(this.form.getRawValue()).subscribe((res) => {
      console.log('Login res: ', res)

      this.store.dispatch(authActions.login({access_token: res.access_token}))
      this.getAuthUser(res.access_token)
      this.cookieService.set('token', res.access_token)
      this.router.navigate(['/'])
    })

    // console.log(this.form.getRawValue())
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // let options = { headers: headers };

    // FIX THE CORS PROBLEM
    // this.http.post('http://www.storefront-api.xyz:3030/users', this.form.getRawValue(), options) 
    // this.http.post('http://localhost:3030/users/auth', this.form.getRawValue(), options)
    //   .subscribe((res) => {
    //     // @ts-ignore
    //     this.cookieService.set('token', res.access_token)
    //     this.router.navigate(['/'])
    //   })
  }
}
