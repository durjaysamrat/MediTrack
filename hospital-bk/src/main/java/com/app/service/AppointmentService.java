package com.app.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.LocalTime;

import com.app.model.Appointment;
import com.app.model.DoctorAvailability;
import com.app.model.Doctor;
import com.app.model.Patient;
import com.app.repo.AppointmentRepository;
import com.app.repo.DoctorAvailabilityRepository;
import com.app.repo.DoctorRepository;
import com.app.repo.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AppointmentService {

    private static final Logger logger = LoggerFactory.getLogger(AppointmentService.class);

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorAvailabilityRepository doctorAvailabilityRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Appointment bookAppointment(Long patientId, Long doctorId, LocalDate date, LocalTime time) {
        Optional<Doctor> doctorOptional = doctorRepository.findById(doctorId);
        Optional<Patient> patientOptional = patientRepository.findById(patientId);

        if (doctorOptional.isEmpty()) {
            throw new RuntimeException("Doctor not found with ID: " + doctorId);
        }

        if (patientOptional.isEmpty()) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }

        Optional<DoctorAvailability> availability = doctorAvailabilityRepository.findByDoctorIdAndDate(doctorId, date);
        if (availability.isEmpty()) {
            throw new RuntimeException("Doctor is not available on this date.");
        }

        DoctorAvailability doctorAvailability = availability.get();
        if (time.isBefore(doctorAvailability.getAvailableFrom()) || time.isAfter(doctorAvailability.getAvailableTo())) {
            throw new RuntimeException("Doctor is not available at this time slot.");
        }

        // ✅ Check if the time slot already has 4 appointments
        int existingAppointments = appointmentRepository.countByDoctorIdAndAppointmentDate(doctorId, date, time);
        if (existingAppointments >= 4) {
            throw new RuntimeException("Time slot is full. Maximum of 4 appointments allowed per hour.");
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patientOptional.get());
        appointment.setDoctor(doctorOptional.get());
        appointment.setAppointmentDate(date);
        appointment.setTimeSlot(time);
        appointment.setStatus("BOOKED");

        return appointmentRepository.save(appointment);
    }

    // ✅ New Method: Fetch All Appointments for a Specific Doctor
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}
