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

  @ViewChild(PostModalComponent) model: PostModalComponent;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.handleGetAllPosts();
  }

  handleGetAllPosts() {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.postsList = response;
      },
    );
  }

  updatePost(post: Post) {
    this.postService.getPostById(post.id).subscribe(
      (response: Post) => {
        this.openModal(response)
      }
    )
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).pipe().subscribe(
      (response: any) => {
        console.log(response);
        console.log(post)
        console.log("Delete successful")
        this.handleGetAllPosts();
      }
    );
  }

  openModal(post: Post) {
    this.selectedPost = post; // Save the current post
    // this.modalService.open(UpdatePostModalComponent, { data: {post: this.selectedPost}});
  }

}
