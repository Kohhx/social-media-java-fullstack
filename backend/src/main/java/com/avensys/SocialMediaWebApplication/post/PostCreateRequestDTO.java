package com.avensys.SocialMediaWebApplication.post;

import org.springframework.web.multipart.MultipartFile;

public record PostCreateRequestDTO(
        String title,
        String caption,
        MultipartFile file,
        String link
) {
}
