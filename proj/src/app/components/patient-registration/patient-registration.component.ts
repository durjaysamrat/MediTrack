import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  patient = {
    name: '',
    age: null,
    phno: '',
    history: '',
    gender: ''
  };

  constructor(private http: HttpClient) {}

  registerPatient() {
    this.http.post('http://localhost:8081/api/register', this.patient).subscribe(response => {
      alert('Patient Registered Successfully!');
      this.patient = { name: '', age: null, phno: '', history: '', gender: '' }; // Reset form
    }, error => {
      console.error('Error registering patient:', error);
    });
  }
}
