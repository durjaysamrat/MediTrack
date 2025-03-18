import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../doctor.service'; // ✅ Import Doctor Service

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  appointment = { patientId: '', doctorId: '', date: '', time: '' };
  patientSearch = '';
  doctorSearch = '';
  filteredPatients: any[] = [];
  filteredDoctors: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService // ✅ Inject Doctor Service
  ) {}

  // ✅ Search Patients using the service
  searchPatients() {
    if (this.patientSearch.trim().length >= 2) {
      this.doctorService.searchPatients(this.patientSearch).subscribe(
        data => this.filteredPatients = data,
        error => console.error('Error fetching patients', error)
      );
    } else {
      this.filteredPatients = [];
    }
  }

  // ✅ Search Doctors using the service
  searchDoctors() {
    if (this.doctorSearch.trim().length >= 2) {
      this.doctorService.searchDoctors(this.doctorSearch).subscribe(
        data => this.filteredDoctors = data,
        error => console.error('Error fetching doctors', error)
      );
    } else {
      this.filteredDoctors = [];
    }
  }

  selectPatient(patient: any) {
    this.appointment.patientId = patient.id;
    this.patientSearch = patient.name;
    this.filteredPatients = [];
  }

  selectDoctor(doctor: any) {
    this.appointment.doctorId = doctor.id;
    this.doctorSearch = `${doctor.firstName} ${doctor.lastName}`;
    this.filteredDoctors = [];
  }

  scheduleAppointment() {
    if (!this.appointment.patientId || !this.appointment.doctorId) {
      alert('Please select a valid Patient and Doctor.');
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
    this.patientSearch = '';
    this.doctorSearch = '';
  }
}
