package com.avensys.SocialMediaWebApplication.post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("posts")
    public ResponseEntity<List<Post>> getAllPosts() {
            List<Post> posts = postService.findAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

//    @PostMapping("post")
//    public ResponseEntity<PostCreateResponseDTO> createPost(@ModelAttribute PostCreateRequestDTO postCreatRequest) {
//        postService.createPost;
//        return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
//    }

    @DeleteMapping("posts/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable long postId) {
        postService.deletePostById(postId);
        return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
    }

}
