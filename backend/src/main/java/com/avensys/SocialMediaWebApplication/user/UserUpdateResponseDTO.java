package com.avensys.SocialMediaWebApplication.user;

import java.time.LocalDateTime;

public record UserUpdateResponseDTO(
        long id,
        String email,
        String firstName,
        String lastName,
        String gender,
        String avatarUrl,
        String token,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
