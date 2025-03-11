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
  nextThreeDays: string[] = [];
  selectedDate: string = '';
  doctorId: number | null = null; // Store doctorId

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.availabilityForm = this.fb.group({
      availableFrom: ['', Validators.required],
      availableTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateNextThreeDays();
    this.doctorId = this.getDoctorIdFromLocalStorage(); // Get the logged-in doctor's ID
  }

  // Generate Next 3 Days Including Today
  generateNextThreeDays(): void {
    const today = new Date();
    this.nextThreeDays = []; // Clear existing values
    for (let i = 0; i < 3; i++) { // Generate next 3 days, excluding today
      let date = new Date(today);
      date.setDate(today.getDate() + i);
      this.nextThreeDays.push(date.toDateString()); // Format: "Mon Mar 11 2025"
    }
    this.selectedDate = this.nextThreeDays[0]; // Default to the first day
  }

  // Get the logged-in doctor's ID from localStorage
  getDoctorIdFromLocalStorage(): number | null {
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    return doctor ? doctor.id : null;
  }

  // Change Selected Date
  selectDate(date: string): void {
    this.selectedDate = date;
  }

  // Update Availability for Selected Date
  updateAvailability(): void {
    if (this.availabilityForm.valid && this.doctorId) {
      const availabilityData = {
        availableFrom: `${this.selectedDate} ${this.availabilityForm.value.availableFrom}`,
        availableTo: `${this.selectedDate} ${this.availabilityForm.value.availableTo}`
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
