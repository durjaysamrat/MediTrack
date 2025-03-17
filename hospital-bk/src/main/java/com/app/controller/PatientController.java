package com.app.controller;
import java.util.Map;

import com.app.model.Patient;
import com.app.model.DoctorAvailability;
import com.app.service.PatientService;
import com.app.service.DoctorAvailabilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Allows Angular to access this API
public class PatientController {
    private final PatientService patientService;
    private final DoctorAvailabilityService availabilityService;

    public PatientController(PatientService patientService, DoctorAvailabilityService availabilityService) {
        this.patientService = patientService;
        this.availabilityService = availabilityService;
    }

    // Get all patients
    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Save a new patient
    @PostMapping("/register")
    public ResponseEntity<Patient> savePatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.savePatient(patient));
    }
    
    @PutMapping("/patients/{id}/updateHistory")
    public ResponseEntity<Patient> updateMedicalHistory(@PathVariable Long id, @RequestBody Map<String, String> update) {
        Patient patient = patientService.getPatientById(id);
        if (patient == null) {
            return ResponseEntity.notFound().build();
        }
        patient.setHistory(update.get("history"));
        patientService.savePatient(patient);
        return ResponseEntity.ok(patient);
    }
}

