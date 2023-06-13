import { Injectable } from '@angular/core';

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
  private TOKEN_PREFIX: string = 'Bearer ';

  constructor() { }


}
