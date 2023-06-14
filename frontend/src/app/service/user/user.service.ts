import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL: string = 'http://localhost:8080/api';
  private AUTH_USER_KEY: string = 'authenticatedUser';
  private TOKEN_KEY = "token"
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {

    const token = this.getAuthenticationToken();

    if (token) {
      this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthenticationToken());
    }

  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(this.AUTH_USER_KEY);
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(this.AUTH_USER_KEY);
    return user !== null;
  }

  getAuthenticationToken() {
    if (this.getAuthenticatedUser() && this.isUserLoggedIn()) {

      let token = sessionStorage.getItem(this.TOKEN_KEY);

      token = token.replace('Bearer ', '');
      return token;
    }
    return null;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`, { headers: this.headers });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`, { headers: this.headers });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/${id}`, { headers: this.headers });
  }

}
