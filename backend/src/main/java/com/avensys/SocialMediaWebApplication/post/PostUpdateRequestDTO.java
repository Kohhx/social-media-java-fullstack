package com.avensys.SocialMediaWebApplication.post;

import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

public record PostUpdateRequestDTO(

        @NotBlank(message = "Post id cannot be blank.")
        long id,

        @NotBlank(message = "Title cannot be blank.")
        String title,

        @NotBlank(message = "Caption cannot be blank.")
        String caption,

        MultipartFile file,

        String link) {
}
