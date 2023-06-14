package com.avensys.SocialMediaWebApplication.post;

import com.avensys.SocialMediaWebApplication.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<List<Post>> findAllByUser(User user);
    Optional<List<Post>> findAllByUserId(long id);
}
