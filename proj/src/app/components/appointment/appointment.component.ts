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
    this.appointmentService.schedule(this.appointment).subscribe(response => {
      alert('Appointment scheduled successfully!');
      this.appointment = { patientId: '', doctorId: '', date: '', time: '' }; // Reset form
    });
  }
}
