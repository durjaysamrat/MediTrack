import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments'; // Backend API

  constructor(private http: HttpClient) {}

  schedule(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedule`, appointment);
  }
}
