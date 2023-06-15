import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  updateUser(id: number, user: any): Observable<User> {
    return this.http.patch<User>(`${this.BASE_URL}/admin/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }

}
