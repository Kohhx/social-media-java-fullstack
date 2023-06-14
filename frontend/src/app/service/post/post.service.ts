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
// import { Post } from 'src/app/common/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL: string = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }


  getAllPosts(): Observable<Post[]> {
    // Return the response from the server
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`);
  }

  createPost(post: any) {
    return this.http.post(`${this.BASE_URL}/posts`, post);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/posts/${id}`);
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/posts`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/posts/${id}`);
  }
}
