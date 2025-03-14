import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8081/api/appointments'; // ✅ Backend API URL

  constructor(private http: HttpClient) {}

  // ✅ Schedule a new appointment
  schedule(appointment: any): Observable<any> {
    console.log("Sending appointment data:", appointment); // ✅ Debugging
    return this.http.post(`${this.baseUrl}/book`, appointment);
  }

  // ✅ Fetch all appointments for a specific doctor
  getAppointmentsByDoctor(doctorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctor/${doctorId}`);
  }

}
