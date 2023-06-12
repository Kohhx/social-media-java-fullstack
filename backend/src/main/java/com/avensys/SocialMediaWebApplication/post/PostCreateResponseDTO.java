package com.avensys.SocialMediaWebApplication.post;

public record PostCreateResponseDTO(
        long id,
        String title,
        String caption,
        String contentUrl,
        String createdAt,
        String updatedAt) {

}
