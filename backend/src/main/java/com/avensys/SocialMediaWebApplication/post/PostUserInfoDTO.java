package com.avensys.SocialMediaWebApplication.post;

public record PostUserInfoDTO(
        String email,
        String firstName,
        String lastName,
        String gender,
        String avatarUrl
) {
}
