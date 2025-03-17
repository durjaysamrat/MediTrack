package com.app.service;

import com.app.model.Doctor;
import com.app.repo.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ Find Doctor by ID
    public Optional<Doctor> findById(Long doctorId) {
        return doctorRepository.findById(doctorId);
    }

    // ✅ Find Doctor by Email (for login)
    public Optional<Doctor> findByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    // ✅ Save or Update Doctor (Fix: Only Hash Password If Changed)
    public Doctor saveDoctor(Doctor doctor) {
        if (doctor.getId() != null) {  // Check if doctor already exists (Update case)
            Optional<Doctor> existingDoctor = doctorRepository.findById(doctor.getId());
            if (existingDoctor.isPresent()) {
                String existingPassword = existingDoctor.get().getPassword();
                if (!doctor.getPassword().equals(existingPassword)) {  // Only hash if changed
                    doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
                }
            } else {
                doctor.setPassword(passwordEncoder.encode(doctor.getPassword())); // New doctor case
            }
        } else {
            doctor.setPassword(passwordEncoder.encode(doctor.getPassword())); // New doctor case
        }

        return doctorRepository.save(doctor);
    }
}
