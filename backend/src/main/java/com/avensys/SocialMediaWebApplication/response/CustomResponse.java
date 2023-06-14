package com.avensys.SocialMediaWebApplication.response;

public class CustomResponse {
  private String message;

    public CustomResponse(String message) {
      this.message = message;
    }

    // getters and setters
    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
}
