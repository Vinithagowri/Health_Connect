import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

import { AppointmentDetailsComponent } from './appointment-list/appointment-details.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';


const routes: Routes = [
  {path:'doc-home',component:DoctorHomeComponent},
  {path:'profile',component:DoctorProfileComponent},
  {path:'patient-records',component:PatientRecordsComponent},
  {path:'appointments',component:AppointmentDetailsComponent},
  {path:'doc-dashboard',component:DoctorDashboardComponent},
  {path:'',redirectTo:'doc-home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
