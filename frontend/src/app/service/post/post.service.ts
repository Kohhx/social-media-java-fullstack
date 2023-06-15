import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Post } from 'src/app/common/post';

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


  constructor(private http: HttpClient) { }

  createPost(post: any) {
    return this.http.post(`${this.BASE_URL}/posts`, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/posts/${id}`);
  }

  updatePost(id: number, post: any): Observable<Post> {
    return this.http.patch<Post>(`${this.BASE_URL}/posts/${id}`, post);
  }

  getPostsByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/users/${id}/posts`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/posts/${id}`);
  }
}
