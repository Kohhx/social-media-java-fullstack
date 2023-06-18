import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-main-searchbar',
  templateUrl: './main-searchbar.component.html',
  styleUrls: ['./main-searchbar.component.css'],
})
export class MainSearchbarComponent implements OnInit {
  searchBarForm!: FormGroup;
  searchResults: any[] = [];
  defaultProfileImage =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  constructor(private router:Router ,private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.searchBarForm = this.fb.group({
      search: [''],
    });

    this.searchBarForm.valueChanges.subscribe({
      next: (value) => {
        if (value.search == null || value.search == '') {
          this.searchResults = [];
        } else {
          this.userService.findUsersByParams(value.search).subscribe({
            next: (data) => {
              console.log(data);
              this.searchResults = data;
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get search() {
    return this.searchBarForm.get('search')!;
  }

  getUserLink(id: number) {
    return `/users/${id}/posts`;
  }

  goToProfile(id: number) {
    this.searchBarForm.reset();
    this.searchResults = [];
    this.router.navigate([`/users/${id}/posts`]);
  }
}
