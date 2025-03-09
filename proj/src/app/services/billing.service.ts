import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = 'http://localhost:8080/api/billing';

  constructor(private http: HttpClient) {}

  getInvoices() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addInvoice(invoice: any) {
    return this.http.post(this.apiUrl, invoice);
  }

  updateInvoiceStatus(id: number, status: string) {
    return this.http.put(`${this.apiUrl}/update/${id}`, { status });
  }
}
