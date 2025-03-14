import { Component, OnInit } from '@angular/core';
import { BillingService } from '../services/BillingService';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  invoices: any[] = [];
  newInvoice = { 
    patientName: '', doctorName: '', userId: '', phone: '', email: '', age: '', 
    service: '', amount: '', status: 'Pending' 
  };

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  // Fetch all invoices
  loadInvoices() {
    this.billingService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  // Generate invoice and print
  generateInvoice() {
    if (!this.newInvoice.patientName || !this.newInvoice.service || !this.newInvoice.amount) {
      alert('⚠️ Please fill in all required fields.');
      return;
    }

    this.billingService.addInvoice(this.newInvoice).subscribe(() => {
      this.loadInvoices();
      this.printInvoice(this.newInvoice);
      this.newInvoice = { 
        patientName: '', doctorName: '', userId: '', phone: '', email: '', age: '', 
        service: '', amount: '', status: 'Pending' 
      };
    });
  }

  // Mark invoice as Paid
  markAsPaid(id: number) {
    this.billingService.updateInvoiceStatus(id, 'Paid').subscribe(() => {
      this.loadInvoices();
    });
  }

  // Print invoice
  printInvoice(invoice: any) {
    const printContent = `
      <h2 style="text-align: center; color: #007bff;">Invoice</h2>
      <p><strong>Patient Name:</strong> ${invoice.patientName}</p>
      <p><strong>Doctor Name:</strong> ${invoice.doctorName}</p>
      <p><strong>User ID:</strong> ${invoice.userId}</p>
      <p><strong>Phone:</strong> ${invoice.phone}</p>
      <p><strong>Email:</strong> ${invoice.email}</p>
      <p><strong>Age:</strong> ${invoice.age}</p>
      <p><strong>Service Provided:</strong> ${invoice.service}</p>
      <p><strong>Amount:</strong> $${invoice.amount}</p>
      <p><strong>Status:</strong> ${invoice.status}</p>
      <hr>
      <p style="text-align: center;">Thank you for choosing our service!</p>
    `;

    const printWindow = window.open('', '_blank');
    printWindow!.document.write(`<html><head><title>Invoice</title></head><body>${printContent}</body></html>`);
    printWindow!.document.close();
    printWindow!.print();
  }

  get pendingInvoices() {
    return this.invoices.filter(inv => inv.status === 'Pending');
  }

  get paidInvoices() {
    return this.invoices.filter(inv => inv.status === 'Paid');
  }
}
