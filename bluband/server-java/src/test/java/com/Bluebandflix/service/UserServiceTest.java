package com.Bluebandflix.service;

import com.Bluebandflix.dto.UserRequest;
import com.Bluebandflix.models.User;
import com.Bluebandflix.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserRequest userRequest;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1); // Corrected to int
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");
        user.setRole("USER");
        user.setFullName("Test User");
        user.setGender("Male");
        user.setPhone("1234567890");
        user.setAddress("123 Test St");
        user.setImage("test.jpg");
        user.setPaid(false);
        user.setAdminApproved(false);

        userRequest = new UserRequest();
        userRequest.setUsername("testuser");
        userRequest.setEmail("test@example.com");
        userRequest.setPassword("rawPassword");
        userRequest.setRole("USER");
        userRequest.setFullName("Test User");
        userRequest.setGender("Male");
        userRequest.setPhone("1234567890");
        userRequest.setAddress("123 Test St");
        userRequest.setImage("test.jpg");
    }

    @Test
    void whenRegisterUser_thenUserIsSavedAndReturned() {
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty()); // Corrected to findByUsername
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User savedUser = userService.registerUser(userRequest); // Corrected return type

        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getEmail()).isEqualTo(user.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void whenRegisterUserWithExistingEmail_thenThrowException() {
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> userService.registerUser(userRequest));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(exception.getReason()).isEqualTo("Email is already taken!");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void whenRegisterUserWithExistingUsername_thenThrowException() {
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user)); // Corrected to findByUsername

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> userService.registerUser(userRequest));
        assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(exception.getReason()).isEqualTo("Username is already taken!");
        verify(userRepository, never()).save(any(User.class));
}
}
