package com.avensys.SocialMediaWebApplication.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

public record UserRegistrationRequestDTO(
  
  @NotBlank(message = "Email cannot be blank.")
  @Email(message = "Email should be valid.")
  String email,
  
  @NotBlank(message = "Password cannot be blank.")
  @Min(value = 8, message = "Password should be at least 7 characters long.")
  String password,
                   
  @NotBlank(message = "First name cannot be blank.")
  @Min(value = 2, message = "First name should be at least 2 characters long.")
  String firstName,
                                         
  @NotBlank(message = "Last name cannot be blank.")
  @Min(value = 2, message = "Last name should be at least 2 characters long.")
  String lastName,
  
  @NotBlank(message = "Gender cannot be blank.")
  String gender,

  MultipartFile avatarFile,
  
  @NotBlank(message = "Role cannot be blank.")
  String[] roles
) {
}
