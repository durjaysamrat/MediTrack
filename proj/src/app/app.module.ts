import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BillingComponent } from './billing/billing.component';
import { ReportComponent } from './report/report.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { HttpClientModule } from '@angular/common/http';
import { AvailabilityComponent } from './availability/availability.component';
import { LoginComponent } from './components/login/login.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { AppointmentComponent } from './components/appointment/appointment.component'; 
import { FormsModule } from '@angular/forms';
import { FrontDeskComponent } from './components/front-desk/front-desk.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    UserComponent,
    DoctorComponent,
    BillingComponent,
    ReportComponent,
    DoctorDashboardComponent,
    PatientsComponent,
    AvailabilityComponent,
    LoginComponent,
    PatientRegistrationComponent,
    AppointmentComponent,
    FrontDeskComponent,
    MedicalRecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
