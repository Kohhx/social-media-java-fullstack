import { Component, Output, EventEmitter, Input, AfterContentInit, OnChanges, SimpleChanges, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService, Post } from 'src/app/service/post/post.service';
import { FormValidators } from 'src/app/validators/form-validators';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnChanges, OnInit {
  loading = false;
  faCircleXmark = faCircleXmark
  @Output() postedUpdated = new EventEmitter<any>();

  updateFormGroup!: FormGroup;

  items: any[] = [];

  @Input() item: any;

  @ViewChild('imageInput') imageInput: any;
  @ViewChild('videoInput') videoInput: any;

  imagePreviewUrl: any = "";
  videoPreviewUrl: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private toastr: ToastrService,
  ) {
    this.updateFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        title: ['', [Validators.required, Validators.maxLength(50)]],
        caption: ['', [Validators.required]],
        link: [''],
        file: [null],
      })
    });
   }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes")
    if (changes['item']) {
      const updatedItem = changes['item'].currentValue;
      if (updatedItem) {
        this.updateFormGroup.get('user').patchValue({
          title: updatedItem.title,
          caption: updatedItem.caption,
          link: updatedItem.contentUrl
        })
      }
    }
  }

  ngOnInit() {

  }

  get id() {
    return this.updateFormGroup.get('user.id');
  }
  get title() {
    return this.updateFormGroup.get('user.title');
  }
  get caption() {
    return this.updateFormGroup.get('user.caption');
  }
  get link() {
    return this.updateFormGroup.get('user.link');
  }
  get file() {
    return this.updateFormGroup.get('user.file');
  }

  handleImageFileClick() {
    this.imageInput.nativeElement.click();
  }

  handleVideoFileClick() {
    this.videoInput.nativeElement.click();
  }

  handleImageFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateFormGroup.get('user.file').setValue(file);

    //Reset link value
    this.updateFormGroup.get('user.link').setValue("");

    // File Preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (this.videoPreviewUrl) {
        this.videoPreviewUrl = "";
      }
      this.imagePreviewUrl = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  handleVideoFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateFormGroup.get('user.file').setValue(file);

    //Reset link value
    this.updateFormGroup.get('user.link').setValue("");

    // File Preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (this.imagePreviewUrl) {
        this.imagePreviewUrl = "";
      }
      this.videoPreviewUrl = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  handleUpdatePost() {
    this.loading= true;
    const post = new FormData();
    post.append('id', this.item.id)
    post.append('title', this.title?.value);
    post.append('caption', this.caption?.value);
    if (this.file?.value) {
      post.append('file', this.file?.value);
    }
    if (this.link?.value) {
      post.append('link', this.link?.value);
    }
    console.log("Checking")
    console.log(this.file?.value)

    this.postService.updatePost(this.item.id, post).subscribe({
      next: (data) => {
        this.loading= false;
        console.log(data);
        console.log("Updated")
        this.toastr.success('Post updated successfully', 'Success');
        this.postedUpdated.emit(true)
        this.closeModal();
      },
      error: (err) => {
        this.loading= false;
        console.log(err);
        this.toastr.error('Error updating post');
      }
    });
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'auto';
    this.updateFormGroup.get('user.file').setValue(null);
    this.cancel.emit();
  }



  resetLink() {
    this.updateFormGroup.get('user.link').setValue("");
  }

}
