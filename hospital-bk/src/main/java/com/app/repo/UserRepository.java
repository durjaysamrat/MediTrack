// 2️⃣ User Repository - UserRepository.java
package com.app.repo;
import com.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
