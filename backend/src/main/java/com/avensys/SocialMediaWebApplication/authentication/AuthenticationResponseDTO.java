package com.avensys.SocialMediaWebApplication.authentication;

import java.util.List;

public class AuthenticationResponseDTO {

    private long id;
    private String message;
    private String email;
    private String token;
    private String avatarUrl;
    private List<String> roles;

    public AuthenticationResponseDTO(long id, String message, String email, String token, String avatarUrl, List<String> roles) {
        this.id = id;
        this.message = message;
        this.email = email;
        this.token = token;
        this.avatarUrl = avatarUrl;
        this.roles = roles;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
