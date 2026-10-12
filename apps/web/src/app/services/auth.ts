import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;


  constructor(
    private http: HttpClient
  ) {

  }

  login(formData) {
    return this.http.post(`${this.apiUrl}/login`, formData);
  }
}
