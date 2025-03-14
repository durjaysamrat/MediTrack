import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8081/api/reports';

  constructor(private http: HttpClient) {}

  getClinicOperationsReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clinic-operations`);
  }

  getFinancialStatisticsReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/financial-statistics`);
  }

  getStaffProductivityReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/staff-productivity`);
  }
}
