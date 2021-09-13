import { Injectable } from '@angular/core';
import { Product } from '../../../models/Product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

let options = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3030'
  }

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, options)
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`, options)
  }
}
