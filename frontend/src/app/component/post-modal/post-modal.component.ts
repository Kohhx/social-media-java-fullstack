import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PostService, Post } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  updateFormGroup: FormGroup;

  items: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.updateFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        caption: ['', [Validators.required, Validators.minLength(5)]],
        link: [''],
        file: [null],
      })
    });
  }

  get title() {
    return this.updateFormGroup.get('title');
  }
  get caption() {
    return this.updateFormGroup.get('caption');
  }
  get link() {
    return this.updateFormGroup.get('link');
  }
  get file() {
    return this.updateFormGroup.get('file');
  }

  handleUpdatePost() {
    const post = new FormData();
    post.append('title', this.title?.value);
    post.append('caption', this.caption?.value);
    if (this.file?.value) {
      post.append('file', this.file?.value);
    }
    if (this.link?.value) {
      post.append('link', this.link?.value);
    }

    this.postService.createPost(post).subscribe({
      next: (data) => {
        console.log(data)
        this.postService.getAllPosts().subscribe({
          next:(posts => {
              this.items = posts;
          }),
          error:(error => {

          })
        })
      },
      error: (err) => {
        console.log(err)
      }

    })
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    this.cancel.emit();
  }
}
