import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express-serve-static-core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post/post.service';
import  { FileUtil } from '../../utility/file-util';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user/user.service';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  createPostForm!: FormGroup;
  faPenToSquare = faPenToSquare;
  fileUtil = FileUtil;
  userId: number;
  items: any = [];
  item: any;
  user: any = {};
  userItem: any = {};

  openUser: boolean = false;

  defaultProfileImage =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  isModalOpen: boolean = false;
  clickedPost: any;

  @ViewChild('imageInput') imageInput: any;
  @ViewChild('videoInput') videoInput: any;

  imagePreviewUrl: any = "";
  videoPreviewUrl: any = "";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private postService: PostService,
    public authService: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      caption: ['', [Validators.required]],
      link: [''],
      file: [null],
    });

    this.link.valueChanges.subscribe((value) => {
      console.log(value);
      this.imagePreviewUrl = value
    })

    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.userId = +params['id'];
      },
    });

    this.getAllPostsByUser(this.userId);

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log(user);
        this.user = user;
      }
    })

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
        this.videoPreviewUrl = "";
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
        this.imagePreviewUrl = "";
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
    })
  }

  handleCreatePost() {
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
          next: (posts => {
            this.items = this.sortPostsByUpdatedAt(posts);
            this.resetPostForm()
            this.imagePreviewUrl = "";
            this.videoPreviewUrl = "";
          }),
          error: (error => {

          })
        })
      },
      error: (error) => {
        console.log(error)
      }

    })
  }

  openUserModal(userItem) {
    console.log(userItem)
    this.userItem = userItem
    this.openUser = true;
  }

  closeUserModal(): void {
    this.openUser = false;
  }

  openPost: boolean = false;

  openPostModal(item) {
    this.item = item
    this.openPost = true;
  }

  closePostModal(): void {
    this.openPost = false;
  }

  reloadPage(postCreated: boolean) {
    if (postCreated) {
      this.getAllPostsByUser(this.userId);
    }
  }

  openDeleteModal(post) {
    console.log(post);
    this.clickedPost = post;
    this.isModalOpen = true;
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  }

  closeDeleteModal() {
    this.isModalOpen = false;
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'auto';
  }

  deletePost() {
    console.log(this.clickedPost);
    this.postService.deletePost(this.clickedPost.id).subscribe({
      next: (res) => {
        this.getAllPostsByUser(this.userId);
      },
      error: (err) => {},
    });
    this.clickedPost = null;
    this.closeDeleteModal();
  }

  private getAllPostsByUser(id: number) {
    this.postService.getPostsByUserId(id).subscribe({
      next: (posts) => {
        // console.log(posts);
        // console.log(posts[0]['user'].avatarUrl);
        this.items = this.sortPostsByUpdatedAt(posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private sortPostsByUpdatedAt(posts: any) {
    return posts.sort(
      (a, b): any =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }
}
