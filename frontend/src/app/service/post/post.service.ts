import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  caption: string;
  contentUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL: string = 'http://localhost:8080/api';
  private AUTH_USER_KEY: string = 'authenticatedUser';
  private TOKEN_KEY = "token"

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {

    // To retreive the token from the session storage, we need to set the header
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthenticationToken());
    console.log(headers);

    // Return the response from the server
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`, { headers });
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

  updatePost(post: Post): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthenticationToken());
    return this.http.put(`${this.BASE_URL}/posts/${post.id}`, post, { headers });
  }

  deletePost(id: any) {
    throw new Error('Method not implemented.');
  }

}
