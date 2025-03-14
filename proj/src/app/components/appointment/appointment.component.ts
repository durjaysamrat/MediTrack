import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  appointment = {
    patientId: '',
    doctorId: '',
    date: '',
    time: ''
  };

  constructor(private appointmentService: AppointmentService) {}

  scheduleAppointment() {
    // ✅ Prevent invalid IDs
    if (!this.appointment.patientId || !this.appointment.doctorId) {
      alert('Please enter a valid Patient ID and Doctor ID.');
      return;
    }

    this.appointmentService.schedule(this.appointment).subscribe(
      response => {
        alert('Appointment scheduled successfully!');
        this.resetForm();
      },
      error => {
        alert('Failed to schedule appointment. ' + error.error);
      }
    );
  }

  resetForm() {
    this.appointment = { patientId: '', doctorId: '', date: '', time: '' };
  }
}
