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

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.updateFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        caption: ['', [Validators.required, Validators.minLength(5)]],
        contentUrl: [''],
      })
    });
  }

  updatePost() {
    const formData = this.updateFormGroup.value;
    const post: Post = {
      id: null,
      title: formData.user.title,
      caption: formData.user.caption,
      contentUrl: formData.user.contentUrl,
      createdAt: null,
      updatedAt: null
    };

    this.postService.updatePost(post).subscribe(() => {
      console.log('Post updated successfully.')
    }, (error) => {
      alert(error)
    });
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    this.cancel.emit();
  }
}
