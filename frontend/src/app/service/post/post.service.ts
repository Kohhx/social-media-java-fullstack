import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Post {
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

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    // To retreive the token from the session storage, we need to set the header
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthenticationToken());

    // Return the response from the server
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`, { headers });
  }

  // Getting the token from the session storage
  private getAuthenticationToken(): string {
    return sessionStorage.getItem('token');
  }

}
