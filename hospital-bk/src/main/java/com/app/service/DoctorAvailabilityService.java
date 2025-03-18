package com.app.service;

import com.app.model.Doctor;
import com.app.model.DoctorAvailability;
import com.app.repo.DoctorAvailabilityRepository;
import com.app.repo.DoctorRepository;
import com.app.repo.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class DoctorAvailabilityService {

    private static final Logger logger = LoggerFactory.getLogger(DoctorAvailabilityService.class);

    @Autowired
    private DoctorAvailabilityRepository doctorAvailabilityRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    // ✅ Update doctor availability with LocalTime
    public DoctorAvailability updateDoctorAvailability(Long doctorId, LocalTime availableFrom, LocalTime availableTo, LocalDate availableDate) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
        if (optionalDoctor.isEmpty()) {
            throw new RuntimeException("Doctor not found with ID: " + doctorId);
        }

        // ✅ Ensure correct availability retrieval for the specific date
        Optional<DoctorAvailability> optionalAvailability = doctorAvailabilityRepository.findByDoctorIdAndDate(doctorId, availableDate);
        DoctorAvailability availability = optionalAvailability.orElse(new DoctorAvailability());

        availability.setDoctor(optionalDoctor.get());
        availability.setAvailableFrom(availableFrom);
        availability.setAvailableTo(availableTo);
        availability.setDate(availableDate);

        logger.info("Saving doctor availability: " + availability);
        return doctorAvailabilityRepository.save(availability);
    }

    // ✅ Check if a doctor is available
    public boolean isDoctorAvailable(Long doctorId, LocalDate date, LocalTime time) {
        Optional<DoctorAvailability> availability = doctorAvailabilityRepository.findByDoctorIdAndDate(doctorId, date);

        if (availability.isEmpty()) {
            logger.warn("Doctor ID " + doctorId + " has no availability set for date " + date);
            return false;
        }

        DoctorAvailability doctorAvailability = availability.get();

        // ✅ Compare `LocalTime` values
        if (time.isBefore(doctorAvailability.getAvailableFrom()) || time.isAfter(doctorAvailability.getAvailableTo())) {
            logger.warn("Doctor is not available at this time slot: " + time);
            return false;
        }

        // ✅ Ensure only 4 appointments per time slot
        int appointmentCount = getAppointmentCount(doctorId, date, time);
        boolean isAvailable = appointmentCount < 4;

        logger.info("Doctor availability for " + date + " at " + time + ": " + isAvailable + ", Existing Appointments: " + appointmentCount);
        return isAvailable;
    }

    // ✅ Count number of appointments in a given time slot
    public int getAppointmentCount(Long doctorId, LocalDate date, LocalTime time) {
        return appointmentRepository.countByDoctorIdAndAppointmentDate(doctorId, date, time);
    }
    
    public DoctorAvailability getDoctorAvailabilityForDate(Long doctorId, LocalDate date) {
        // Fetch the availability from the repository
        Optional<DoctorAvailability> availabilityOptional = doctorAvailabilityRepository.findByDoctorIdAndDate(doctorId, date);

        // If availability is found, return it, otherwise handle the case when not found
        if (availabilityOptional.isPresent()) {
            return availabilityOptional.get();
        } else {
            // You can return null, throw an exception, or log it depending on your requirement
            logger.warn("No availability found for Doctor ID: {} on Date: {}", doctorId, date);
            return null;  // Or you can throw an exception like `throw new AvailabilityNotFoundException()`
        }
    }
}
