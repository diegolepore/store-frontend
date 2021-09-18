import { Injectable } from '@angular/core'
import { Product } from '../../../models/Product'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string
  headers!: HttpHeaders
  options!: { headers: HttpHeaders }

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://www.storefront-api.xyz:3030'
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    this.options = { headers: this.headers }
  }

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, this.options)
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`, this.options)
  }
}
