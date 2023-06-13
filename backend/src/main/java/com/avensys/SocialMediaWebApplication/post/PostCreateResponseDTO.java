package com.avensys.SocialMediaWebApplication.post;

import java.time.LocalDateTime;

public record PostCreateResponseDTO(
        long id,
        String title,
        String caption,
        String contentUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
