import {
  Component,
  Output,
  EventEmitter,
  Input,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from 'src/app/validators/form-validators';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent {
  loading = false;
  faCirclePlus = faCirclePlus;
  faUserPen = faUserPen
  updateFormGroup: FormGroup;

  defaultImage =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  avatarPreview: any = this.defaultImage;

  @Output() updatedUser = new EventEmitter<any>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('avatar') avatar: any;
  @Input() item: any;
  @ViewChild('imageInput') imageInput: any;

  imagePreviewUrl: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.updateFormGroup = this.formBuilder.group({
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
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
        ]),
        gender: new FormControl('Select Gender', [
          Validators.required,
          FormValidators.checkGender,
        ]),
        avatarUrl: new FormControl(''),
        avatarFile: new FormControl(''),
      }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      const updatedItem = changes['item'].currentValue;

      if (updatedItem) {
        this.avatarPreview = updatedItem.avatarUrl;
        this.updateFormGroup.get('user').patchValue({
          firstName: updatedItem.firstName,
          lastName: updatedItem.lastName,
          email: updatedItem.email,
          avatarUrl: updatedItem.avatarUrl,
          gender: updatedItem.gender,
        });
      }
    }
  }

  ngOnInit(): void {

  }

  matchPasswordValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const password = this.updateFormGroup?.get('user.password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  get firstName() {
    return this.updateFormGroup.get('user.firstName');
  }
  get lastName() {
    return this.updateFormGroup.get('user.lastName');
  }
  get gender() {
    return this.updateFormGroup.get('user.gender');
  }
  get email() {
    return this.updateFormGroup.get('user.email');
  }
  get password() {
    return this.updateFormGroup.get('user.password');
  }
  get confirmPassword() {
    return this.updateFormGroup.get('user.confirmPassword');
  }
  get avatarUrl() {
    return this.updateFormGroup.get('user.avatarUrl');
  }
  get avatarFile() {
    return this.updateFormGroup.get('user.avatarFile');
  }

  closeModal(): void {
    this.updateFormGroup.get('user.avatarFile').setValue(null);
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'auto';
    this.cancel.emit();
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.updateFormGroup.get('user.avatarUrl').setValue('');
    this.updateFormGroup.get('user.avatarFile').setValue(file);

    // File Preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarPreview = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  openFileBrowser() {
    this.avatar.nativeElement.click();
  }

  handleUpdateUser() {
    this.loading = true;
    const user = new FormData();
    user.append('id', this.item?.id);
    user.append('firstName', this.firstName?.value);
    user.append('lastName', this.lastName?.value);
    user.append('gender', this.gender?.value);
    user.append('email', this.email?.value);
    user.append('password', this.password?.value);
    if (this.avatarFile?.value) {
      user.append('avatarFile', this.avatarFile?.value);
    }
    if (this.avatarUrl?.value) {
      user.append('avatarUrl', this.avatarUrl?.value);
    }

    this.userService.updateUser(this.item.id, user).subscribe(() => {
      this.loading = false;
      console.log('User updated successfully.');
      this.updatedUser.emit(true);
      this.closeModal();
    },
    (error) => {
      this.loading = false;
      console.log(error);
      this.toastr.error("Error updating user");
    });
  }

  resetLink() {
    this.avatarPreview = this.defaultImage;
    this.updateFormGroup.get('user.avatarUrl').setValue('');
  }

  captializeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
