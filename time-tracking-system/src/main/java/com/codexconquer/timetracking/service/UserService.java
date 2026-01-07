package com.codexconquer.timetracking.service;

import com.codexconquer.timetracking.dto.RegisterRequest;
import com.codexconquer.timetracking.entity.User;
import com.codexconquer.timetracking.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Create User entity
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(request.getPassword()) // plain for now
                .role("CANDIDATE")
                .build();

        // Save to DB
        return userRepository.save(user);
    }
}
