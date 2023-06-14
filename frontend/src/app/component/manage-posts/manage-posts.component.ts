import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/common/post';
import { PostService } from 'src/app/service/post/post.service';
import { PostModalComponent } from '../post-modal/post-modal.component';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  postsList: Post[] = [];
  selectedPost: Post;
  storage: Storage = sessionStorage;
  openPost: boolean = false;

  // @ViewChild(PostModalComponent) model: PostModalComponent;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.handleGetAllPosts();
  }

  handleGetAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data: any) => {
        this.postsList = data;
      }
    });
  }

  updatePost(post: Post) {
    this.selectedPost = post;
    this.openModal(post)
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).subscribe({
      next:(response: any) => {
        this.handleDeletePost(post);
        console.log(response)
        console.log(post)
      }
    })
  }

  handleDeletePost(post: Post) {
    if (this.postsList.length == 1) {
      this.postsList = [];
    } else {
      const index = this.postsList.indexOf(post);
      this.postsList.splice(index, 1);
    }
    alert('Post deleted successfully!')
  };

  openModal(post: Post) {
    this.openPost = true;
  }

  closePostModal() {
    this.openPost = false;
  }

}
