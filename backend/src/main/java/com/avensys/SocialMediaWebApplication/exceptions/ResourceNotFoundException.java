package com.avensys.SocialMediaWebApplication.exceptions;

public class ResourceNotFoundException extends GlobalException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, boolean includeStackTrace) {
        super(message, includeStackTrace);
    }
}
