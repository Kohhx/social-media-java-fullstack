package com.avensys.SocialMediaWebApplication.post;

import com.avensys.SocialMediaWebApplication.cloudinary.CloudinaryHelper;
import com.avensys.SocialMediaWebApplication.exceptions.ResourceNotFoundException;
import com.avensys.SocialMediaWebApplication.user.User;
import com.avensys.SocialMediaWebApplication.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CloudinaryHelper cloudinaryHelper;

    public PostService(PostRepository postRepository, UserRepository userRepository, CloudinaryHelper cloudinaryHelper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.cloudinaryHelper = cloudinaryHelper;
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    public Post findPostById(long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            return post.get();
        } else {
            throw new ResourceNotFoundException("Post with id %s not found".formatted(id));
        }
    }

    public PostCreateResponseDTO createPost(PostCreateRequestDTO postCreateRequest) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user = userRepository.findByEmail(principal.getName());
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }
        Post post = new Post();
        post.setTitle(postCreateRequest.title());
        post.setCaption(postCreateRequest.caption());

        if (postCreateRequest.link() != null && !postCreateRequest.link().isEmpty()) {
            post.setContentUrl(postCreateRequest.link());
        } else if (postCreateRequest.file() != null && !postCreateRequest.file().isEmpty()) {
            try {
                Map uploadResult = cloudinaryHelper.upload(postCreateRequest.file());
                post.setContentUrl((uploadResult.get("url").toString()));
                post.setContentId((uploadResult.get("public_id").toString()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        post.setUser(user.get());
        Post postSaved = postRepository.save(post);
        PostCreateResponseDTO postCreateResponse = new PostCreateResponseDTO(postSaved.getId(), postSaved.getTitle(), postSaved.getCaption(), postSaved.getContentUrl(), postSaved.getCreatedAt(), postSaved.getUpdatedAt());
        return postCreateResponse;
    }

    public void deletePostById(long id) {
        Post post = findPostById(id);
        if (post.getContentId() != null && !post.getContentId().isEmpty()) {
            try {
                Map deleteResult = cloudinaryHelper.delete(post.getContentId(),post.getContentUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        postRepository.delete(post);
    }


}
