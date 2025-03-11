import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8081/api'; // ✅ Ensure API URL is Correct

  constructor(private http: HttpClient) {}

  // ✅ Login Method for Doctor
  loginDoctor(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/doctors/login`, loginData)
      .pipe(catchError(this.handleError)); // ✅ Error Handling
  }

  // ✅ Register a Patient
  registerPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, patient)
      .pipe(catchError(this.handleError)); // ✅ Error Handling
  }

  // ✅ Get List of Patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get Doctor's Availability
  getAvailability(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctors/${doctorId}/availability`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Update Doctor's Availability
  updateAvailability(doctorId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctors/${doctorId}/availability`, data)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get Schedules for Doctors
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedules`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Centralized Error Handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('❌ API Error:', error);
    return throwError(() => new Error(`Something went wrong: ${error.message}`));
  }
}
