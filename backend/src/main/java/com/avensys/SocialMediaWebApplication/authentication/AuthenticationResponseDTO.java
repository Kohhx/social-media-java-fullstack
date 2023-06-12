package com.avensys.SocialMediaWebApplication.authentication;

import java.util.List;

public class AuthenticationResponseDTO {

    private String message;
    private String token;
    private List<String> roles;

    public AuthenticationResponseDTO(String message, String token, List<String> roles) {
        this.message = message;
        this.token = token;
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
}
