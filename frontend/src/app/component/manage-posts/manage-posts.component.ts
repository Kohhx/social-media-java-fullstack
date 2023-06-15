import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  // For searchbar in manage posts page:
  private _searchTerm: string = '';
  filteredPostsList: Post[] = [];

  // For pagination:
  page: number = 1;
  postsPerPage: number = 10;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.handleGetAllPosts();
  }

  handleGetAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data: any) => {
        this.postsList = data;
        this.filterPosts();
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
    this.cancel.emit();
  }

  // For searchbar in manage posts page:
  filterPosts() {
    this.filteredPostsList = this.postsList.filter((post: Post) => {
      // Add filters for id / username / title / content:
      return post.id.toString().includes(this.searchTerm) ||
      (post.user.firstName ? post.user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) : false) ||
      (post.user.lastName ? post.user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) : false) ||
      (post.title ? post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) : false) ||
      (post.caption ? post.caption.toLowerCase().includes(this.searchTerm.toLowerCase()) : false)
    })
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterPosts();
  }

}
