import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { BillingComponent } from './billing/billing.component';
import { ReportComponent } from './report/report.component';
import { PatientsComponent } from './patients/patients.component';
import { AvailabilityComponent } from './availability/availability.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home as default page
  { path: 'doctor-login', component: DoctorComponent }, // Doctor Login Route

  { 
    path: 'admin', 
    component: AdminComponent, 
    children: [
      { path: 'users', component: UserComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'reports', component: ReportComponent }
    ] 

  },
  { 
    path: 'doctor-dashboard', 
    component: DoctorDashboardComponent, 
    children: [
      { path: 'patients', component: PatientsComponent },
      { path: 'availability', component: AvailabilityComponent }
    ] 
    
  },

  { path: '**', redirectTo: '' } // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
