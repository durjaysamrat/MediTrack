import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';

import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { BillingComponent } from './billing/billing.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, 
    children: [
    { path: 'users', component: UserComponent },
    { path: 'billing', component: BillingComponent },
    { path: 'reports', component: ReportComponent }
 ] },]
  
  { path: '', Component: HomeComponent}

const routes: Routes = [
  { path: '', component: HomeComponent }, // Redirect to login by default
  { path: 'doctor-login', component: DoctorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
