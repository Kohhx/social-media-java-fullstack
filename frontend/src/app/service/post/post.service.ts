import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Post } from 'src/app/common/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL: string = 'http://localhost:8080/api';
  private AUTH_USER_KEY: string = 'authenticatedUser';
  private TOKEN_KEY = "token"
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {

    // To retreive the token from the session storage each time as a constant:
    const token = this.getAuthenticationToken();

    if (token) {
      this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthenticationToken());
    }
  }

  getAllPosts(): Observable<Post[]> {
    // Return the response from the server
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`, { headers: this.headers } );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/posts/${id}`, { headers: this.headers });
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(this.AUTH_USER_KEY);
  }

  isUserLoggedIn():boolean {
    let user = sessionStorage.getItem(this.AUTH_USER_KEY);
    return user !== null;
  }

  // Getting the token from the session storage
  getAuthenticationToken(): string {
    if (this.getAuthenticatedUser() && this.isUserLoggedIn()) {
      let token = sessionStorage.getItem(this.TOKEN_KEY);
      // Remove any 'Bearer ' prefix from the stored token to avoid duplication
      token = token.replace('Bearer ', '');
      return token;
    }
    return null;
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/posts/${id}`, { headers: this.headers });
  }

}
