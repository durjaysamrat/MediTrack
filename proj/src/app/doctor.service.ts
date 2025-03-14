import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8081/api'; // ✅ API base URL remains unchanged

  constructor(private http: HttpClient) {}

  // ✅ Login Method for Doctor
  loginDoctor(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/doctors/login`, loginData)
      .pipe(catchError(this.handleError));
  }

  // ✅ Register a Patient
  registerPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, patient)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get List of Patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get Doctor's Availability (Fixed API URL)
  getAvailability(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/availability/check?doctorId=${doctorId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Update Doctor's Availability (Fixed API URL & POST Method)
  updateAvailability(doctorId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/availability/${doctorId}`, data) // ✅ Fixed API path & method
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
