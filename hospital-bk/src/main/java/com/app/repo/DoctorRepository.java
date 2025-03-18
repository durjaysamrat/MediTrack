package com.app.repo;

import com.app.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	@Query("SELECT d FROM Doctor d WHERE LOWER(d.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(d.lastName) LIKE LOWER(CONCAT('%', :search, '%'))")
	List<Doctor> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(@RequestParam("search") String search);

    Optional<Doctor> findByEmail(String email);  // ✅ Uses Optional to avoid NullPointerException
}