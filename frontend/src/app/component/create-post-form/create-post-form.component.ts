import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post/post.service';
import { FileUtil } from 'src/app/utility/file-util';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css'],
})
export class CreatePostFormComponent {
  @Output('postCreated') postCreated = new EventEmitter<any>();
  loading = false;
  createPostForm!: FormGroup;
  fileUtil = FileUtil;

  defaultProfileImage =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  @ViewChild('imageInput') imageInput: any;
  @ViewChild('videoInput') videoInput: any;

  imagePreviewUrl: any = '';
  videoPreviewUrl: any = '';

  // items: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private postService: PostService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      caption: ['', [Validators.required]],
      link: [''],
      file: [null],
    });

    this.link.valueChanges.subscribe((value) => {
      console.log(value);
      this.imagePreviewUrl = value;
    });

    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        console.log(posts);
        console.log(posts[0]['user'].avatarUrl);
        // this.items = this.sortPostsByUpdatedAt(posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get title() {
    return this.createPostForm.get('title');
  }
  get caption() {
    return this.createPostForm.get('caption');
  }
  get link() {
    return this.createPostForm.get('link');
  }
  get file() {
    return this.createPostForm.get('file');
  }

  handleImageFileClick() {
    this.imageInput.nativeElement.click();
  }

  handleVideoFileClick() {
    this.videoInput.nativeElement.click();
  }

  handleImageFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createPostForm.patchValue({ file: file });

    // File Preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (this.videoPreviewUrl) {
        this.videoPreviewUrl = '';
      }
      this.imagePreviewUrl = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  handleVideoFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createPostForm.patchValue({ file: file });

    // File Preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (this.imagePreviewUrl) {
        this.imagePreviewUrl = '';
      }
      this.videoPreviewUrl = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  resetPostForm() {
    this.createPostForm.reset({
      title: '',
      caption: '',
      link: '',
      file: null,
    });
  }

  handleCreatePost() {
    this.loading = true;
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
        // console.log(data);
        this.loading = false;
        this.toastr.success('Post created successfully', 'Success');
        this.postCreated.emit(true);
        this.resetPostForm();
        this.imagePreviewUrl = '';
        this.videoPreviewUrl = '';
        this.imageInput.nativeElement.value = '';
        this.videoInput.nativeElement.value = '';
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }
}
