import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, 
    children: [
    { path: 'users', component: UserComponent },
    { path: 'billing', component: BillingComponent },
    { path: 'reports', component: ReportsComponent }
  ] },
  
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
