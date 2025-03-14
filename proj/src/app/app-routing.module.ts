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
import { FrontDeskComponent } from './components/front-desk/front-desk.component';
import { LoginComponent } from './components/login/login.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AdminTbComponent } from './admin-tb/admin-tb.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home as default page
  { path: 'doctor-login', component: DoctorComponent }, // Doctor Login Route
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'login', component: LoginComponent },
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
      { path: 'availability', component: AvailabilityComponent },
      {path: 'schedules', component:SchedulesComponent}
    ] 
    
  },
  { 
    path: 'front-desk', 
    component: FrontDeskComponent,
    children: [
      { path: 'patient-registration', component: PatientRegistrationComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'medical-records', component: MedicalRecordsComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' } // Default to login
    ] 
  },

  { path: '**', redirectTo: '' } // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
