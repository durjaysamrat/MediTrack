import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients'; // Backend API

  constructor(private http: HttpClient) {}

  registerPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, patient);
  }
}
