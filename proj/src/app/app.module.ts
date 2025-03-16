import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BillingComponent } from './billing/billing.component';
import { ReportComponent } from './report/report.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { HttpClientModule } from '@angular/common/http';
import { AvailabilityComponent } from './availability/availability.component';
import { LoginComponent } from './components/login/login.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { AppointmentComponent } from './components/appointment/appointment.component'; 
import { FrontDeskComponent } from './components/front-desk/front-desk.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { BillingService } from './services/BillingService';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { UserComponent } from './user/user.component';
import { EntityModalComponent } from './entity-modal/entity-modal.component';
import { DoctorUsersComponent } from './doctorusers/doctorusers.component';
import { DeskusersComponent } from './deskusers/deskusers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    AdminLoginComponent, 
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
    MedicalRecordsComponent,
    SchedulesComponent,
    EntityModalComponent,
    DoctorUsersComponent,
    DeskusersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [BillingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
