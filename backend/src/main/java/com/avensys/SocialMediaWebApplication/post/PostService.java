package com.avensys.SocialMediaWebApplication.post;

import com.avensys.SocialMediaWebApplication.exceptions.ResourceNotFoundException;
import com.avensys.SocialMediaWebApplication.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> findAllPosts(){
        return postRepository.findAll();
    }

    public Post findPostById(long id){
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()){
            return post.get();
        } else {
            throw new ResourceNotFoundException("Post with id %s not found".formatted(id));
        }
    }

//    public Post createPost(PostCreateRequestDTO postCreateRequest, Principal principal) {
//        Optional<User> user = userRepository.findByEmail(principal.getName());
//        if (!user.isPresent()) {
//            throw new UsernameNotFoundException("User not found");
//        }
//        Post post = new Post();
//        post.setTitle(postCreateRequest.title());
//        post.setCaption(postCreateRequest.caption());
//
//        if (postCreateRequest.link() != null){
//            post.setContentUrl(postCreateRequest.link());
//        } else if (postCreateRequest.file() != null){
//
//        }
//
//    }

    public void deletePostById(long id) {
        Post post = findPostById(id);
        postRepository.delete(post);
    }


}
