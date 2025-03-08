import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  patients: any[] = [];
  selectedPatient: any = null;
  availabilityForm: FormGroup;

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {
    this.availabilityForm = this.fb.group({
      availableFrom: [''],
      availableTo: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.doctorService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  updateAvailability() {
    const availability = this.availabilityForm.value;
    this.doctorService.updateAvailability(availability).subscribe(() => {
      alert('Availability updated');
    });
  }
}
