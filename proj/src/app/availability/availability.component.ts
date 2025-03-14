import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  availabilityForm: FormGroup;
  selectedDate: string = ''; // Store only one date
  doctorId: number | null = null; // Store doctorId

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.availabilityForm = this.fb.group({
      availableFrom: ['', Validators.required],
      availableTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateTodayDate();
    this.doctorId = this.getDoctorIdFromLocalStorage(); // Get the logged-in doctor's ID
  }

  // ✅ Generate Today's Date in YYYY-MM-DD format (correct format for API)
  generateTodayDate(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Example: "2025-03-14"
  }

  // ✅ Get the logged-in doctor's ID from localStorage
  getDoctorIdFromLocalStorage(): number | null {
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    return doctor ? doctor.id : null;
  }

  // ✅ Update Availability for Selected Date
  updateAvailability(): void {
    if (this.availabilityForm.valid && this.doctorId) {
      const availabilityData = {
        availableFrom: this.availabilityForm.value.availableFrom, // Send only "HH:mm"
        availableTo: this.availabilityForm.value.availableTo,     // Send only "HH:mm"
        date: this.selectedDate // Send only "YYYY-MM-DD"
      };

      // Pass doctorId and availability data to the service
      this.doctorService.updateAvailability(this.doctorId, availabilityData).subscribe(
        () => {
          alert(`✅ Availability Updated for ${this.selectedDate}!`);
          this.availabilityForm.reset(); // Clear form after submission
        },
        (error) => {
          console.error('❌ Error updating availability:', error);
        }
      );
    } else {
      alert('❌ Please make sure the form is complete and the doctor is logged in.');
    }
  }
}
