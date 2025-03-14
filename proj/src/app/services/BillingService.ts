import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = 'http://localhost:8081/api/invoices';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, invoice);
  }

  updateInvoiceStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}
