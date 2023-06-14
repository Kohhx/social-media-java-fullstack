import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/service/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user/user.service';
import { FileUtil } from '../../utility/file-util';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  fileUtil = FileUtil;
  userId: number;
  items: any = [];
  user: any = {};
  defaultProfileImage =
    'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png';

  isModalOpen: boolean = false;
  clickedPost: any;

  constructor(
    public authService: AuthenticationService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
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
      },
    });
  }

  openUser: boolean = false;

  openUserModal() {
    this.openUser = true;
  }

  closeUserModal(): void {
    this.openUser = false;
  }

  openPost: boolean = false;

  openPostModal() {
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
