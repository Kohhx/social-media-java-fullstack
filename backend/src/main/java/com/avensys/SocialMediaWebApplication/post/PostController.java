package com.avensys.SocialMediaWebApplication.post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.avensys.SocialMediaWebApplication.response.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("posts")
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
            List<PostResponseDTO> PostResponses = postService.findAllPosts();
        return new ResponseEntity<>(PostResponses, HttpStatus.OK);
    }

    @PostMapping("posts")
    public ResponseEntity<PostResponseDTO> createPost(@ModelAttribute PostCreateRequestDTO postCreateRequest) {
        PostResponseDTO postCreateResponse = postService.createPost(postCreateRequest);
        return new ResponseEntity<>(postCreateResponse, HttpStatus.OK);
    }

    @PatchMapping("posts/{postId}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable long postId, @ModelAttribute PostUpdateRequestDTO postUpdateRequest) {
        PostResponseDTO postUpdateResponse = postService.updatePost(postId, postUpdateRequest);
        return new ResponseEntity<>(postUpdateResponse, HttpStatus.OK);
    }


    @DeleteMapping("posts/{postId}")
    public ResponseEntity<CustomResponse> deletePost(@PathVariable long postId) {
        postService.deletePostById(postId);
        return new ResponseEntity<>(new CustomResponse("Post deleted successfully"), HttpStatus.OK);
    }


    @GetMapping("users/{userId}/posts")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsByUserId(@PathVariable long userId) {
        List<PostResponseDTO> PostResponses = postService.getPostsByUserId(userId);
        return new ResponseEntity<>(PostResponses, HttpStatus.OK);
    }


}
