import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  appointments: any[] = []; // Store appointments

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const doctorId = 1; // Set doctor ID (or get dynamically)
    this.appointmentService.getAppointmentsByDoctor(doctorId).subscribe(
      (data) => {
        console.log('Appointments:', data); // Debugging
        this.appointments = data; // Assign response
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
}
