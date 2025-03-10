import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8081/api'; // Replace with actual API

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`);
  }

  getAvailability(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctors/${doctorId}/availability`);
  }

  updateAvailability(doctorId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctors/${doctorId}/availability`, data);
  }
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedules`);
  }
}
