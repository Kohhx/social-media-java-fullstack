import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/common/user';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string = 'http://localhost:8080/api';
  private TOKEN_PREFIX: string = 'Bearer ';
  private AUTH_USER_KEY: string = 'authenticatedUser';
  private TOKEN_KEY = 'token';
  private ROLE_KEY = 'role';
  private AVATAR_KEY = 'avatar';
  private AUTH_ID_KEY = 'id';

  constructor(private http: HttpClient, private authService:AuthenticationService) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.BASE_URL}/users/${id}`, user).pipe(
      map((data) => {
        let currentUserId = sessionStorage.getItem('id');
        // If the user updates his/her own profile, update the session storage:
        if (currentUserId == data.id.toString()) {
          let token = this.TOKEN_PREFIX + data.token;
          this.authService.removeSessionStorage();
          this.authService.setSessionStorage(data.id, data.email, token, data.avatarUrl, data.roles);
        }
        return data;
      })
    );
  }

  updateUserWithRoles(id: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.BASE_URL}/admin/users/${id}`, user).pipe(
      map((data) => {
        let currentUserId = sessionStorage.getItem('id');
        // If the user updates his/her own profile, update the session storage:
        if (currentUserId == data.id.toString()) {
          let token = this.TOKEN_PREFIX + data.token;
          this.authService.removeSessionStorage();
          this.authService.setSessionStorage(data.id, data.email, token, data.avatarUrl, data.roles);
        }
        return data;
      })
    );
  }

  findUsersByParams(keyword: string): Observable<User[]> {
    return this.http.get<any>(`${this.BASE_URL}/users/search?keyword=${keyword}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/admin/users/${id}`);
  }

  existsByEmail(email: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.BASE_URL}/users/email?email=${email}`);
  }

}
