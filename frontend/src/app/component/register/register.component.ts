import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // private registerFormService: RegisterFormService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    // Initialize the form group
    this.registerFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        gender: new FormControl('Gender', [Validators.required, FormValidators.checkGender]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(7)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(7), this.matchPasswordValidator()])
      }),
    });
  }

  // Custom validator function to match password and confirmPassword
  matchPasswordValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const password = this.registerFormGroup?.get('user.password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  // Getter methods for all form controls:
  get firstName() { return this.registerFormGroup.get('user.firstName'); }
  get lastName() { return this.registerFormGroup.get('user.lastName'); }
  get gender() { return this.registerFormGroup.get('user.gender'); }
  get email() { return this.registerFormGroup.get('user.email'); }
  get password() { return this.registerFormGroup.get('user.password'); }
  get confirmPassword() { return this.registerFormGroup.get('user.confirmPassword'); }

  onSubmit() {
    console.log(this.gender?.value)
    console.log(this.gender?.errors);
    console.log(this.gender?.invalid);
    console.log(this.gender?.dirty);
    console.log(this.gender?.touched);

    const user = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      gender: this.gender?.value,
      email: this.email?.value,
      password: this.password?.value,
      roles: ["ROLE_USER"]
    }

    this.authenticationService.signup(user).subscribe({
      next: () => {
        alert(`Your account has been created successfully`);
        this.router.navigateByUrl("/feed");
      },
      error: () => {

      }
    })
  }
}
