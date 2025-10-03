package com.Bluebandflix.repository;

import com.Bluebandflix.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//     Tambahan query method jika diperlukan
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
}
