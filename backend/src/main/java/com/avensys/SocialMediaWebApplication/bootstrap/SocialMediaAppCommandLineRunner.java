package com.avensys.SocialMediaWebApplication.bootstrap;

import com.avensys.SocialMediaWebApplication.post.PostRepository;
import com.avensys.SocialMediaWebApplication.user.UserRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class SocialMediaAppCommandLineRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder bcryptPasswordEncoder;

    public SocialMediaAppCommandLineRunner(UserRepository userRepository, PostRepository postRepository, PasswordEncoder bcryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.bcryptPasswordEncoder = bcryptPasswordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        Faker faker = new Faker();
        Random random = new Random();
        String genderArray[] = {"male", "female"};

        String password = bcryptPasswordEncoder.encode("password");
        String firstName = faker.name().firstName(); // Emory
        String lastName = faker.name().lastName(); // Barton
        String email = firstName + lastName + "@gmail.com";
        String gender = genderArray[new Random().nextInt(genderArray.length)];
//        String
//        employees.add(new Employee(firstName, lastName, gender, null, email, age, address));


    }
}
