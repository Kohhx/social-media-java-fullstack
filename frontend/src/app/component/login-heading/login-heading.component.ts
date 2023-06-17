import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user/user.service';
import { Typewriter } from 'src/app/shared/typewriter/typewriter';

@Component({
  selector: 'app-login-heading',
  templateUrl: './login-heading.component.html',
  styleUrls: ['./login-heading.component.css'],
})
export class LoginHeadingComponent implements OnInit {
  @Input() id;
  @ViewChild('navWelcome') navWelcome: any;
  user: any = {};

  constructor(
    public authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserById(this.authService.getAuthenticatedUserId());
  }

  private getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.navWelcome.nativeElement.innerHTML =
          'Welcome, ' + this.user.firstName + ' ' + this.user.lastName + '!';
        const typewriter = new Typewriter(this.id, {
          interval: 100,
          delay: 300,
          type: 'forward',
        });
        typewriter.run();
      },
    });
  }
}
