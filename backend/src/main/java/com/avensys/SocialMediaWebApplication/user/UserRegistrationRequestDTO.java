package com.avensys.SocialMediaWebApplication.user;

public record UserRegistrationRequestDTO(String email,
                                         String password,
                                         String firstName,
                                         String lastName,
                                         String gender,
                                         String[] roles
) {
}
