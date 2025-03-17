
package com.app.repo;

import com.app.model.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;  // ✅ Fix: Import LocalDate
import java.util.Optional;

@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Long> {

    // ✅ Fix: Find availability by doctor ID and date
    Optional<DoctorAvailability> findByDoctorIdAndDate(Long doctorId, LocalDate date);
}
