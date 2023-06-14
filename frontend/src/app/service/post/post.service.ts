import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/common/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createPost(post: any) {
    return this.http.post(`${this.BASE_URL}/posts`, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.BASE_URL}/posts/${id}`);
  }

  getPostsByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/users/${id}/posts`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.BASE_URL}/posts/${post.id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/posts/${id}`);
  }

}
