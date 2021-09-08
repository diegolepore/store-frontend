import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  form!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      pass: ''
    })
  }

  submitLogin(): void {
    // console.log(this.form.getRawValue())
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    // FIX THE CORS PROBLEM
    // this.http.post('http://www.storefront-api.xyz:3030/users', this.form.getRawValue(), options) 
    this.http.post('http://localhost:3030/users/auth', this.form.getRawValue(), options)
      .subscribe((res) => {
        // @ts-ignore
        this.cookieService.set('token', res.access_token)
        this.router.navigate(['/'])
      })
  }
}
