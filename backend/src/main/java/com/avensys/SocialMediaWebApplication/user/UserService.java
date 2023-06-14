package com.avensys.SocialMediaWebApplication.user;

import com.avensys.SocialMediaWebApplication.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new ResourceNotFoundException("User with id %s not found".formatted(id));
        }
    }

    public UserResponseDTO findUserByIdDTO(long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return userToUserResponseDTO(user.get());
        } else {
            throw new ResourceNotFoundException("User with id %s not found".formatted(id));
        }
    }

    public void deleteUserById(long id) {
        User user = findUserById(id);
        userRepository.delete(user);
    }

    private UserResponseDTO userToUserResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getGender(),
                user.getAvatarUrl(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
