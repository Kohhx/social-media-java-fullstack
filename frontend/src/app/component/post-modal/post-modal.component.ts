import { Component, Output, EventEmitter, Input, ViewChild, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/common/post';
import { PostService } from 'src/app/service/post/post.service';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  @Input() item: Post;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  updateFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {
    this.updateFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        id: [''],
        title: ['', [Validators.required, Validators.minLength(5)]],
        caption: ['', [Validators.required, Validators.minLength(5)]],
        contentUrl: [''],
      })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.updateFormGroup.get('user').patchValue(changes['item'].currentValue);
    }
  }

  updatePost() {
    if (this.updateFormGroup.valid) {
      const formData = this.updateFormGroup.value;
      console.log('formData: ' + JSON.stringify(formData))
      const post: Post = {
        id: formData.user.id,
        title: formData.user.title,
        caption: formData.user.caption,
        contentUrl: formData.user.contentUrl || '',
        createdAt: null,
        updatedAt: null,
        user: undefined
      };

      console.log('Post Data:', post);

      this.postService.updatePost(post).subscribe(() => {
        console.log('Post updated successfully.')
      });
    }
  }

  closeModal(): void {
    this.cancel.emit();
  }
}
