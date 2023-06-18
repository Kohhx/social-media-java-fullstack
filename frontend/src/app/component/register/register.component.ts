import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { FormValidators } from 'src/app/validators/form-validators';
import { ToastrService } from 'ngx-toastr';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  registerFormGroup: FormGroup;
  loading = false;

  avatarPreview: any =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  @ViewChild('avatar') avatar: any;

  constructor(
    private formBuilder: FormBuilder,
    // private registerFormService: RegisterFormService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Initialize the form group
    this.registerFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidators.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          FormValidators.notOnlyWhiteSpace,
        ]),
        gender: new FormControl('Select Gender', [
          Validators.required,
          FormValidators.checkGender,
        ]),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email,
          ],
          [FormValidators.emailExistCheckWithDatabase(this.userService)]
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          this.matchPasswordValidator(),
        ]),
        avatarFile: new FormControl(''),
        terms: new FormControl(false, Validators.requiredTrue)
      }),
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.registerFormGroup.get('user').patchValue({
      avatarFile: file,
    });

    // File Preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarPreview = fileReader.result;
    };
    fileReader.readAsDataURL(file);
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
  get firstName() {
    return this.registerFormGroup.get('user.firstName');
  }
  get lastName() {
    return this.registerFormGroup.get('user.lastName');
  }
  get gender() {
    return this.registerFormGroup.get('user.gender');
  }
  get email() {
    return this.registerFormGroup.get('user.email');
  }
  get password() {
    return this.registerFormGroup.get('user.password');
  }
  get confirmPassword() {
    return this.registerFormGroup.get('user.confirmPassword');
  }
  get avatarFile() {
    return this.registerFormGroup.get('user.avatarFile');
  }

  onSubmit() {
    this.loading = true;
    const user = new FormData();
    user.append('firstName', this.firstName?.value);
    user.append('lastName', this.lastName?.value);
    user.append('gender', this.gender?.value);
    user.append('email', this.email?.value);
    user.append('password', this.password?.value);
    if (this.avatarFile?.value) {
      user.append('avatarFile', this.avatarFile?.value);
    }
    user.append('roles', ['ROLE_USER'].toString());

    this.authenticationService.signup(user).subscribe({
      next: () => {
        this.toastr.success(`Your account has been created successfully`);
        this.loading = false;
        this.router.navigateByUrl('/feed');
      },
      error: () => {
        this.toastr.error(`Error occured while creating your account`);
        this.loading = false;
      },
    });
  }

  openFileBrowser() {
    this.avatar.nativeElement.click();
  }
}
