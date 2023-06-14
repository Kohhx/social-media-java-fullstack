import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'express-serve-static-core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  createPostForm!: FormGroup;

  defaultProfileImage = "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png";

  @ViewChild('imageInput') imageInput: any;
  @ViewChild('videoInput') videoInput: any;

  imagePreviewUrl: any = "";
  videoPreviewUrl: any = "";

  items: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: [''],
      caption: [''],
      link: [''],
      file: [null],
    });

    this.link.valueChanges.subscribe((value) => {
      console.log(value);
      this.imagePreviewUrl = value
    } )

    this.postService.getAllPosts().subscribe({
      next:(posts => {
        console.log(posts)
        console.log(posts[0]['user'].avatarUrl)
        this.items = posts;
      }),
      error:(error => {
        console.log(error)
      })
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
          next:(posts => {
              this.items = posts;
              this.resetPostForm()
              this.imagePreviewUrl = "";
              this.videoPreviewUrl = "";
          }),
          error:(error => {

          })
        })
      },
      error: (error) => {
        console.log(error)
      }

    })
  }

  getExtension(filename: string) {
    return filename.split('.').pop();
  }

  isImage(filename: string) {
    const ext = this.getExtension(filename);
    if (ext) {
      return ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'png'
      || ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'gif'
      || ext.toLowerCase() === 'bmp' || ext.toLowerCase() === 'svg'
      || ext.toLowerCase() === 'webp' || ext.toLowerCase() === 'ico'
      || ext.toLowerCase() === 'tif' || ext.toLowerCase() === 'tiff';
    }
    return false;
  }

  isVideo(filename: string) {
    const ext = this.getExtension(filename);
    if (ext) {
      return ext.toLowerCase() === 'mp4' || ext.toLowerCase() === 'webm'
      || ext.toLowerCase() === 'mkv' || ext.toLowerCase() === 'flv'
      || ext.toLowerCase() === 'avi' || ext.toLowerCase() === 'wmv'
      || ext.toLowerCase() === 'mov' || ext.toLowerCase() === '3gp'
      || ext.toLowerCase() === 'mpeg' || ext.toLowerCase() === 'mpg';
    }
    return false;
  }

}
