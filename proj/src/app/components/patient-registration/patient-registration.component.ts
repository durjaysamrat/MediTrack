import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  patient = {
    name: '',
    age: '',
    contact: '',
    medicalHistory: ''
  };

  constructor(private patientService: PatientService) {}

  registerPatient() {
    this.patientService.registerPatient(this.patient).subscribe(response => {
      alert('Patient registered successfully!');
      this.patient = { name: '', age: '', contact: '', medicalHistory: '' }; // Reset form
    });
  }
}
