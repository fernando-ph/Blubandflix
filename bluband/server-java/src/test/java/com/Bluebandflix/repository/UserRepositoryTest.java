package com.Bluebandflix.repository;

import com.Bluebandflix.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole("USER");
    }



    @Test
    void whenFindByEmail_thenNotFound() {
        Optional<User> found = userRepository.findByEmail("nonexistent@example.com");
        assertThat(found).isNotPresent();
    }


    @Test
    void whenFindByUsername_thenNotFound() {
        Optional<User> found = userRepository.findByUsername("nonexistentuser");
        assertThat(found).isNotPresent();
    }

    @Test
    void whenExistsByEmail_thenReturnFalse() {
        boolean exists = userRepository.existsByEmail("nonexistent@example.com");
        assertThat(exists).isFalse();
    }



    @Test
    void whenExistsByUsername_thenReturnFalse() {
        boolean exists = userRepository.existsByUsername("nonexistentuser");
        assertThat(exists).isFalse();
    }
}
