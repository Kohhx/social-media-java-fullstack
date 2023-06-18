import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Handling the login button here.');
  }

  get email() {
    return this.loginFormGroup.get('email');
  }
  get password() {
    return this.loginFormGroup.get('password');
  }

  login() {
    this.loading = true;
    const email = this.email?.value;
    const password = this.password?.value;

    this.authenticationService.login(email, password).subscribe({
      next: (data) => {
        console.log('Login successful');
        this.toastr.success('Login successful');
        this.loading = false;
        this.router.navigate(['posts'])
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Invalid Credential. Please try again');
      }
    });
  }
}
