import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private authentication: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.authentication.getAuthenticationToken();
    const username = this.authentication.getAuthenticatedUser();
    if (headers && username) {
      req = req.clone({
        setHeaders: {
          Authorization: headers,
        }
      })
    }
    return next.handle(req);
  }
}
