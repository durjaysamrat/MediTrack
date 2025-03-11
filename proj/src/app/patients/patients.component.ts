import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];  
  filteredPatients: any[] = [];  // Stores filtered results
  selectedPatient: any = null;  
  searchTerm: string = '';  

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.doctorService.getPatients().subscribe((data) => {
      this.patients = data;
      this.filteredPatients = data;  // Initialize filtered list
    });
  }

  viewPatient(patient: any) {
    this.selectedPatient = patient;
  }

  searchPatients() {
    this.filteredPatients = this.patients.filter(patient => 
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
