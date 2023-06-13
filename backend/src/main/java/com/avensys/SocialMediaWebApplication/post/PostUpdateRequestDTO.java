package com.avensys.SocialMediaWebApplication.post;

import org.springframework.web.multipart.MultipartFile;

public record PostUpdateRequestDTO(
        long id,
        String title,
        String caption,
        MultipartFile file,
        String link) {
}
