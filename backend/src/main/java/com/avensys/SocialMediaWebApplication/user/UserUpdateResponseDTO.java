package com.avensys.SocialMediaWebApplication.user;

import java.time.LocalDateTime;
import java.util.List;

public record UserUpdateResponseDTO(
        long id,
        String email,
        String firstName,
        String lastName,
        String gender,
        String avatarUrl,
        String token,
        List<String> roles,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
