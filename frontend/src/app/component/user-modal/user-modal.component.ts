import { Component, Output, EventEmitter, Input, AfterContentInit, OnChanges, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from 'src/app/validators/form-validators';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnChanges, OnInit {
  faCirclePlus = faCirclePlus;
  updateFormGroup: FormGroup;

  avatarPreview: any =
  'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  @ViewChild('avatar') avatar: any;

  items: any[] = [];

  @Input() item: any;

  @ViewChild('imageInput') imageInput: any;

  imagePreviewUrl: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['item']) {
      const updatedItem = changes['item'].currentValue;
      if (updatedItem && updatedItem.title) {
        this.updateFormGroup.get('user.firstName').setValue(updatedItem.firstName);
        this.updateFormGroup.get('user.lastName').setValue(updatedItem.lastName);
        this.updateFormGroup.get('user.email').setValue(updatedItem.email);
      }
    }
  }

  ngOnInit(): void {
    this.updateFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(7)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(7), this.matchPasswordValidator()]),
        avatarFile: new FormControl(''),
      }),
    });
    
  }

  matchPasswordValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const password = this.updateFormGroup?.get('user.password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  get firstName() { return this.updateFormGroup.get('user.firstName'); }
  get lastName() { return this.updateFormGroup.get('user.lastName'); }
  get gender() { return this.updateFormGroup.get('user.gender'); }
  get email() { return this.updateFormGroup.get('user.email'); }
  get password() { return this.updateFormGroup.get('user.password'); }
  get confirmPassword() { return this.updateFormGroup.get('user.confirmPassword'); }
  get avatarFile() { return this.updateFormGroup.get('user.avatarFile'); }

  onSubmit() {
    console.log("Handling registration form submit button.")
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    this.cancel.emit();
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.updateFormGroup.get('user').patchValue({
      avatarFile: file,
    });

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
    const user = new FormData();
    user.append('firstName', this.firstName?.value);
    user.append('lastName', this.lastName?.value);
    user.append('gender', this.gender?.value);
    user.append('email', this.email?.value);
    user.append('password', this.password?.value);
    if (this.avatarFile?.value) {
      user.append('avatarFile', this.avatarFile?.value);
    }

    this.userService.updateUser(this.item.id, user).subscribe({
      next: (data) => {
        console.log(data);
        this.userService.getAllUsers().subscribe({
          next: (users) => {
            this.items = users;
            location.reload();
          },
          error: (error) => {
            
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
