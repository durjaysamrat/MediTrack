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

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.availabilityForm = this.fb.group({
      availableFrom: [''],
      availableTo: ['']
    });
  }

  ngOnInit(): void {}

  updateAvailability() {
    const availability = this.availabilityForm.value;
    this.doctorService.updateAvailability(availability).subscribe(() => {
      alert('Availability updated successfully!');
    });
  }
}
