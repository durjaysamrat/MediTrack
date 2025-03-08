import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = []; // Store retrieved patients

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  
  loadPatients() {
    this.doctorService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }


  viewPatient(patient: any) {
    alert(`Patient: ${patient.name}\nHistory: ${patient.history}`);
  }
}
