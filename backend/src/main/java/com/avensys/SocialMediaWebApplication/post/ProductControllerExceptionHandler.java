package com.avensys.SocialMediaWebApplication.post;

import com.avensys.SocialMediaWebApplication.exceptions.ExceptionResponse;
import com.avensys.SocialMediaWebApplication.exceptions.ResourceAccessDeniedException;
import com.avensys.SocialMediaWebApplication.exceptions.UploadFileException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDate;

@ControllerAdvice
public class ProductControllerExceptionHandler {
    @ExceptionHandler({UploadFileException.class})
    public ResponseEntity<Object> handleApiException(UploadFileException uploadFileException) {
        ExceptionResponse apiException = new ExceptionResponse(
                uploadFileException.getMessage(),
                uploadFileException,
                HttpStatus.BAD_REQUEST,
                LocalDate.now()
        );

        if (uploadFileException.includeStackTrace) {
            return new ResponseEntity<>(apiException, apiException.getHttpStatus());
        }

        apiException.setThrowable(null);
        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler({ResourceAccessDeniedException.class})
    public ResponseEntity<Object> handleApiException(ResourceAccessDeniedException resourceAccessDeniedException) {
        ExceptionResponse apiException = new ExceptionResponse(
                resourceAccessDeniedException.getMessage(),
                resourceAccessDeniedException,
                HttpStatus.FORBIDDEN,
                LocalDate.now()
        );

        if (resourceAccessDeniedException.includeStackTrace) {
            return new ResponseEntity<>(apiException, apiException.getHttpStatus());
        }

        apiException.setThrowable(null);
        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }
}
