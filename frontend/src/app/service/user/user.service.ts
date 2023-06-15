import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/common/user';

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

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.BASE_URL}/users/${id}`, user).pipe(
      map((data) => {
        console.log(data);
        let currentUserId = sessionStorage.getItem('useId');
        // If the user updates his/her own profile, update the session storage:
        if (currentUserId == id.toString()) {
          this.removeSessionStorage();
          let token = this.TOKEN_PREFIX + data.token;
          this.setSessionStorage(data.id, data.email, token, data.avatarUrl, data.roles);
        }
        return data;
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }

  existsByEmail(email: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.BASE_URL}/users/email?email=${email}`);
  }

  private setSessionStorage(
    id: string,
    email: string,
    token: string,
    avatarUrl: string,
    roles: string
  ) {
    sessionStorage.setItem(this.AUTH_ID_KEY, id);
    sessionStorage.setItem(this.AUTH_USER_KEY, email);
    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.ROLE_KEY, roles);
    sessionStorage.setItem(this.AVATAR_KEY, avatarUrl);
  }

  private removeSessionStorage() {
    sessionStorage.removeItem(this.AUTH_USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.ROLE_KEY);
    sessionStorage.removeItem(this.AVATAR_KEY);

  }
}
