import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  appointments: any[] = []; // Store appointments
  doctorId: number | null = null; // Store the doctorId dynamically

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getDoctorIdFromLocalStorage();  // Get the doctor's ID dynamically
  }

  // ✅ Get the logged-in doctor's ID from localStorage
  getDoctorIdFromLocalStorage(): void {
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    if (doctor && doctor.id) {
      this.doctorId = doctor.id;  // Store the doctorId
      this.loadAppointments();    // Load appointments once doctorId is retrieved
    } else {
      alert('❌ Doctor not logged in!');
      // Optionally, redirect to login page if doctor is not logged in
      // this.router.navigate(['/login']);
    }
  }

  loadAppointments() {
    if (this.doctorId) {
      // Fetch appointments for the logged-in doctor using the dynamic doctorId
      this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe(
        (data) => {
          console.log('Appointments:', data); // Debugging
          this.appointments = data; // Assign response to the appointments array
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    } else {
      console.error('❌ Doctor ID is not available!');
    }
  }
}
