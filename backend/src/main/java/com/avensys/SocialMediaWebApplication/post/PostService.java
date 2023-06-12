package com.avensys.SocialMediaWebApplication.post;

import com.avensys.SocialMediaWebApplication.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
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

    public void deletePostById(long id) {
        Post post = findPostById(id);
        postRepository.delete(post);
    }


}
