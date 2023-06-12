package com.avensys.SocialMediaWebApplication.authentication;

import com.avensys.SocialMediaWebApplication.exceptions.ResourceNotFoundException;
import com.avensys.SocialMediaWebApplication.jwt.JwtService;
import com.avensys.SocialMediaWebApplication.user.User;
import com.avensys.SocialMediaWebApplication.user.UserRegistrationRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/api/signup")
    public ResponseEntity<AuthenticationResponseDTO> signup(@RequestBody UserRegistrationRequestDTO userRegistration) {
        User user = authenticationService.registerUser(userRegistration);
        String token = jwtService.generateToken(user.getEmail());
        return new ResponseEntity<>(new AuthenticationResponseDTO("Account has been registered", token, user.getRolesList() ), HttpStatus.CREATED);
    }

    @PostMapping("/api/login")
    public ResponseEntity<AuthenticationResponseDTO> authenticateAndGetToken(@RequestBody AuthLoginRequestDTO authRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),
                        authRequest.getPassword()));

        System.out.println("AUTH" + authentication.getAuthorities());
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getUsername());
            List<String> roles = authenticationService.getUserRoles(authRequest.getUsername());
            return  new ResponseEntity<>(new AuthenticationResponseDTO("Login successfully", token, roles), HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Invalid user request");
        }
    }

    // This route require basic auth, Both USER AND ADMIN can login
    @GetMapping("/")
    public String helloWorld() {
        return "Hello World";
    }

    // This route require basic auth, Only ADMIN can access
    @GetMapping("/message")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getMessage() {
        return "Hey, Admin";
    }


}
