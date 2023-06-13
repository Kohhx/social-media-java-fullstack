import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

interface AuthenticationBean {
  message: string;
}

interface UserRegistration {
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  email: string;
  imageFile? : File;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL: string = 'http://localhost:8080/api';
  private TOKEN_PREFIX: string = 'Bearer ';
  private AUTH_USER_KEY: string = 'authenticatedUser';
  private TOKEN_KEY = "token"
  private ROLE_KEY = "role"

  constructor(private http: HttpClient) { }

  signup(userRegistration: UserRegistration) {
     return this.http.post<any>(`${this.BASE_URL}/signup`, userRegistration)
      .pipe(
        map((data) => {
          console.log(data);
          let token = this.TOKEN_PREFIX + data.token;
          // sessionStorage.setItem(this.AUTH_USER_KEY, userRegistration.email);
          // sessionStorage.setItem(this.TOKEN_KEY, token);
          // sessionStorage.setItem(this.ROLE_KEY, data.role);
          this.setSessionStorage(userRegistration.email, token, data.roles)
          return data;
        })
      );
  }

  authenticate(email:string, password:string) {
    return this.http.post<any>(`${this.BASE_URL}/login`, {email, password}).pipe(map( data => {
      let token = this.TOKEN_PREFIX + data.token;
      // sessionStorage.setItem(this.AUTH_USER_KEY, email);
      // sessionStorage.setItem(this.TOKEN_KEY, token);
      // sessionStorage.setItem(this.ROLE_KEY, data.role);
      this.setSessionStorage(email, token, data.roles)
      return data;
    }))
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(this.AUTH_USER_KEY);
  }

  isUserLoggedIn():boolean {
    let user = sessionStorage.getItem(this.AUTH_USER_KEY);
    return user !== null;
  }

  getAuthenticationToken(): string {
    if (this.getAuthenticatedUser() && this.isUserLoggedIn()) {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  logout() {
    // sessionStorage.removeItem(this.AUTH_USER_KEY);
    // sessionStorage.removeItem(this.TOKEN_KEY);
    // sessionStorage.removeItem(this.ROLE_KEY);
    this.removeSessionStorage()
  }

  getUserRoles() {
    return sessionStorage.getItem(this.ROLE_KEY)?.split(',');
  }

  checkRole(role: string): boolean {
      return this.getUserRoles()?.includes(role) ?? false;
  }

  private setSessionStorage(email: string, token: string, roles: string) {
    sessionStorage.setItem(this.AUTH_USER_KEY, email);
    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.ROLE_KEY, roles);
  }

  private removeSessionStorage() {
    sessionStorage.removeItem(this.AUTH_USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.ROLE_KEY);
  }


}
