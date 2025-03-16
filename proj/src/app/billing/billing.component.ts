import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../services/BillingService';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  invoices: any[] = [];
  invoiceForm: FormGroup;

  constructor(private billingService: BillingService, private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      patientName: ['', Validators.required],
      doctorName: ['', Validators.required],
      userId: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      service: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      status: ['Pending']
    });
  }

  ngOnInit() {
    this.loadInvoices();
  }

  // Fetch all invoices
  loadInvoices() {
    this.billingService.getInvoices().subscribe({
      next: (data) => this.invoices = data,
      error: (err) => console.error('Error fetching invoices:', err)
    });
  }

  // Generate invoice and print
  generateInvoice() {
    if (this.invoiceForm.invalid) {
      alert('⚠️ Please fill in all required fields correctly.');
      return;
    }

    this.billingService.addInvoice(this.invoiceForm.value).subscribe({
      next: () => {
        this.loadInvoices();
        this.printInvoice(this.invoiceForm.value);
        this.invoiceForm.reset({ status: 'Pending' });
      },
      error: (err) => console.error('Error generating invoice:', err)
    });
  }

  // Mark invoice as Paid
  markAsPaid(id: number) {
    this.billingService.updateInvoiceStatus(id, 'Paid').subscribe({
      next: () => this.loadInvoices(),
      error: (err) => console.error('Error updating invoice status:', err)
    });
  }

  // Print invoice
  printInvoice(invoice: any) {
    const printContent = `
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f8f9fa; padding: 20px; }
          .invoice-container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
          .invoice-header { text-align: center; color: #007bff; margin-bottom: 20px; font-size: 24px; font-weight: bold; }
          .invoice-details { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .invoice-details th, .invoice-details td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .invoice-details th { background-color: #007bff; color: #fff; }
          .total-amount { font-size: 20px; font-weight: bold; color: #28a745; text-align: right; }
          .status { font-weight: bold; text-transform: uppercase; color: ${invoice.status === 'Paid' ? '#28a745' : '#ffc107'}; }
          .footer { text-align: center; margin-top: 20px; font-size: 16px; color: #555; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">Invoice</div>
          <table class="invoice-details">
            <tr><th>Invoice Number</th><td>${invoice.id || 'N/A'}</td></tr>
            <tr><th>Patient Name</th><td>${invoice.patientName}</td></tr>
            <tr><th>Doctor Name</th><td>${invoice.doctorName}</td></tr>
            <tr><th>User ID</th><td>${invoice.userId}</td></tr>
            <tr><th>Phone</th><td>${invoice.phone}</td></tr>
            <tr><th>Email</th><td>${invoice.email}</td></tr>
            <tr><th>Age</th><td>${invoice.age}</td></tr>
            <tr><th>Service Provided</th><td>${invoice.service}</td></tr>
            <tr><th>Amount</th><td class="total-amount">$${invoice.amount}</td></tr>
            <tr><th>Status</th><td class="status">${invoice.status}</td></tr>
          </table>
          <div class="footer">Thank you for choosing our service!</div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Popup blocked! Please allow pop-ups for this site.');
    }
  }

  // Get Pending & Paid Invoices
  get pendingInvoices() {
    return this.invoices.filter(inv => inv.status === 'Pending');
  }

  get paidInvoices() {
    return this.invoices.filter(inv => inv.status === 'Paid');
  }

    // Mark invoice as Pending (from Paid section)
    markAsPending(id: number) {
      this.billingService.updateInvoiceStatus(id, 'Pending').subscribe({
        next: () => this.loadInvoices(),
        error: (err) => console.error('Error updating invoice status:', err)
      });
    }

  // Check if a form field is invalid
  isFieldInvalid(field: string): boolean {
    const control = this.invoiceForm.get(field);
    return control ? control.invalid && control.touched : false;
  }
}
