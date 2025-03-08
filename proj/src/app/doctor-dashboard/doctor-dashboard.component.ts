import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  patients: any[] = [];  // Will store patients from the backend
  availabilityForm: FormGroup;

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {
    this.availabilityForm = this.fb.group({
      availableFrom: [''],
      availableTo: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients(); // Fetch patient data when the dashboard loads
  }

  loadPatients() {
    this.doctorService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  
  updateAvailability() {
    const availability = this.availabilityForm.value;
    this.doctorService.updateAvailability(availability).subscribe(() => {
      alert('Availability updated successfully!');
    });
  }

 
  viewPatient(patient: any) {
    alert(`Viewing Patient:\nName: ${patient.name}\nAge:${patient.age}\nGender:${patient.gender}\nHistory: ${patient.history}\nNotes: ${patient.notes}\nPhone:${patient.phno}\n`);
  }
}
