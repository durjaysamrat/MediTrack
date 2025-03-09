import { Component, OnInit } from '@angular/core';
import { BillingService } from '../services/billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  invoices: any[] = [];
  newInvoice = { patientName: '', service: '', amount: '', status: 'Pending' };

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.billingService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  generateInvoice() {
    this.billingService.addInvoice(this.newInvoice).subscribe(() => {
      this.loadInvoices();
      this.newInvoice = { patientName: '', service: '', amount: '', status: 'Pending' };
    });
  }

  markAsPaid(id: number) {
    this.billingService.updateInvoiceStatus(id, 'Paid').subscribe(() => {
      this.loadInvoices();
    });
  }
}
