import { Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3030'
  }

  getAuthUser(id: string, accessToken: string): Observable<User> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    let options = { headers: headers };

    return this.httpClient.get<User>(`${this.baseUrl}/users/${id}`, options)
  }
}
