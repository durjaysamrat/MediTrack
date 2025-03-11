import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  availabilityForm: FormGroup;
  doctorId: number = 1; // Change this to dynamically fetch doctor ID if needed

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {
    this.availabilityForm = this.fb.group({
      availableFrom: [''],
      availableTo: ['']
    });
  }

  ngOnInit(): void {
    this.loadAvailability();
  }

  loadAvailability() {
    this.doctorService.getAvailability(this.doctorId).subscribe((data) => {
      if (data) {
        this.availabilityForm.patchValue({
          availableFrom: data.availableFrom,
          availableTo: data.availableTo
        });
      }
    });
  }

  updateAvailability() {
    const availability = this.availabilityForm.value;
    this.doctorService.updateAvailability(this.doctorId, availability).subscribe(() => {
      alert('Availability updated successfully!');
    });
  }
}
