import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const userguardGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  if (authenticationService.isUserLoggedIn() && authenticationService.isUser()) {
    return true;
  }
  if (authenticationService.isUserLoggedIn()) {
    return router.navigate(['posts']);
  }
  return router.navigate(['login']);
};
