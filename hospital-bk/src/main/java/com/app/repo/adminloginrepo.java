package com.app.repo;

import com.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface adminloginrepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
