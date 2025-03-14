import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  admins = [
    { name: 'John Doe', email: 'admin@example.com', role: 'Super Admin', contact: '123-456-7890', permissions: 'Full Access' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', contact: '987-654-3210', permissions: 'Manage Users' }
  ];

  selectedAdmin: any = null;

  viewAdmin(admin: any) {
    this.selectedAdmin = admin;
  }

  closeModal() {
    this.selectedAdmin = null;
  }
}
