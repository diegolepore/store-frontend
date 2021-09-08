import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      pass: ''
    })
  }

  submitRegister(): void {
    // console.log(this.form.getRawValue())
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    // FIX THE CORS PROBLEM
    // this.http.post('http://www.storefront-api.xyz:3030/users', this.form.getRawValue(), options) 
    this.http.post('http://localhost:3030/users', this.form.getRawValue(), options)
      .subscribe(res => {
        this.router.navigate(['/login'])
      })
  }

}
