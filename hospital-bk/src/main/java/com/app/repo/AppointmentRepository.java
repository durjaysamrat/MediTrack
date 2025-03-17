package com.app.repo;

import com.app.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT COUNT(a) FROM Appointment a " +
           "WHERE a.doctor.id = :doctorId " +
           "AND DATE(a.appointmentDate) = :date " +
           "AND a.timeSlot = :time")
    int countByDoctorIdAndAppointmentDate(
        @Param("doctorId") Long doctorId, 
        @Param("date") LocalDate date, 
        @Param("time") LocalTime time // ✅ Changed to LocalTime
    );
    List<Appointment> findByDoctorId(Long doctorId);
}
