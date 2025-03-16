import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorUserService {
  private apiUrl = 'http://localhost:8081/api/doctoruser'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDoctor(doctor: any): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  updateDoctor(doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${doctor.id}`, doctor);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
