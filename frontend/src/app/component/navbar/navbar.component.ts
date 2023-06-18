import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  id: number;
  defaultProfileImage =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  button1Active: boolean = true;
  button2Active: boolean = false;

  faUser = faUser;
  faHome = faHome;

  // isNavbarCollapsed = true;

  // toggleNavbar() {
  //   this.isNavbarCollapsed = !this.isNavbarCollapsed;
  //   console.log('Toggling navbar. isNavbarCollapsed is now:', this.isNavbarCollapsed);
  // }

  toggleButton1() {
    this.button1Active = true;
    this.button2Active = false;
  }

  toggleButton2() {
    this.button1Active = false;
    this.button2Active = true;
  }

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption() {
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (!this.isDropdownClicked(target)) {
      this.showDropdown = false;
    }
  }

  isDropdownClicked(target: HTMLElement): boolean {
    const dropdownElement = document.querySelector('.dropdown');
    return dropdownElement?.contains(target);
  }

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.authenticationService.getAuthenticatedUserId();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
    this.toast.success('Logged out successfully');
  }

  isProfileImagePresent() {
    return this.authenticationService.getProfileAvatar() != null;
  }

  getOwnProfileLink() {
    // console.log(
    //   `/users/${this.authenticationService.getAuthenticatedUserId()}/posts`
    // );
    return `/users/${this.authenticationService.getAuthenticatedUserId()}/posts`;
  }
}
