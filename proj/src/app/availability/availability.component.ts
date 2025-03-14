import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  availabilityForm: FormGroup;
  selectedDate: string = ''; // Store the selected date
  doctorId: number | null = null; // Store the doctorId

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.availabilityForm = this.fb.group({
      availableFrom: ['', Validators.required],
      availableTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDoctorIdFromLocalStorage();  // Dynamically get doctor ID
    this.generateTodayDate();            // Set today's date dynamically
  }

  // ✅ Get the logged-in doctor's ID from localStorage
  getDoctorIdFromLocalStorage(): void {
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    if (doctor && doctor.id) {
      this.doctorId = doctor.id;
      this.generateTodayDate();  // Update date whenever doctorId changes
      this.loadDoctorAvailability();  // Load the doctor's availability (can be an API call)
    } else {
      alert('❌ Doctor not logged in!');
    }
  }

  // ✅ Load the doctor's availability from the backend (API call)
  loadDoctorAvailability(): void {
    if (this.doctorId) {
      this.doctorService.getAvailability(this.doctorId).subscribe(
        (availability: any) => {  // Typing the response as 'any' or define a specific type for it
          console.log('Doctor Availability:', availability);
          // Handle the response and populate the form if needed
          // this.availabilityForm.patchValue(availability); // You can use this if the response matches the form structure
        },
      );
    }
  }

  // ✅ Generate Today's Date in YYYY-MM-DD format (correct format for API)
  generateTodayDate(): void {
    const today = new Date();
    
    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');  // Add leading zero for months < 10
    const day = today.getDate().toString().padStart(2, '0');  // Add leading zero for days < 10
    
    this.selectedDate = `${year}-${month}-${day}`;
  }
  

  // ✅ Update Availability for Selected Date
  // ✅ Update Availability for Selected Date
updateAvailability(): void {
  // Check if the form is valid and doctorId is available
  if (this.availabilityForm.valid && this.doctorId) {
    console.log('Form is valid. Doctor ID:', this.doctorId);
    
    // Prepare availability data
    const availabilityData = {
      availableFrom: this.availabilityForm.value.availableFrom, // Send only "HH:mm"
      availableTo: this.availabilityForm.value.availableTo,     // Send only "HH:mm"
      date: this.selectedDate // Send only "YYYY-MM-DD"
    };

    console.log('Availability Data:', availabilityData);

    // Make the HTTP request to update availability
    this.doctorService.updateAvailability(this.doctorId, availabilityData).subscribe(
      (response) => {
        console.log('API Response:', response);
        alert(`✅ Availability Updated for ${this.selectedDate}!`);
        this.availabilityForm.reset(); // Clear form after submission
      },
      (error: HttpErrorResponse) => {
        console.error('❌ Error updating availability:', error);
        alert('❌ There was an error while updating availability.');
      }
    );
  } else {
    // If form is invalid or doctorId is missing
    console.log('Form is invalid or doctorId is missing');
    alert('❌ Please make sure the form is complete and the doctor is logged in.');
  }
}
}
