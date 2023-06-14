import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  defaultProfileImage = "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"

  constructor(public authenticationService: AuthenticationService, private router:Router, private toast:ToastrService){}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
    this.toast.success("Logged out successfully");
  }

  isProfileImagePresent() {
    return this.authenticationService.getProfileAvatar() != null;
  }

}
