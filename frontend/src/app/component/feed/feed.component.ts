import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express-serve-static-core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post/post.service';
import  { FileUtil } from '../../utility/file-util';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  fileUtil = FileUtil;
  faShare = faShare;
  faThumbsUp = faThumbsUp;

  defaultProfileImage = "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png";

  items: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private postService: PostService,
    public authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getAllPosts()
  }

  reloadPage(isPostCreated: boolean) {
    if (isPostCreated) {
      this.getAllPosts()
    }
  }

  private sortPostsByUpdatedAt(posts:any) {
     return posts.sort((a,b):any => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }

  private getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next:(posts => {
        // console.log(posts)
        console.log(posts[0]['user'].avatarUrl)
        this.items = this.sortPostsByUpdatedAt(posts);
      }),
      error:(err => {
        console.log(err)
      })
    })
  }

}
