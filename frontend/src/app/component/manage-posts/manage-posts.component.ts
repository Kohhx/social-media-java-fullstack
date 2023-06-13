import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  postsList: any[] = [];
  storage: Storage = sessionStorage;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.handleGetAllPosts();
  }

  handleGetAllPosts() {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.postsList = response;
        console.log(this.postsList);
      },
    );
  }

  updatePost(post: any) {

  }

  deletePost(post: any) {
    // this.postService.deletePost(post.id).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     this.handleGetAllPosts();
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

}
