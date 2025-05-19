import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

import { AppointmentDetailsComponent } from './appointment-list/appointment-details.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientRecordsComponent } from './patient-records/patient-records.component';

const routes: Routes = [
  {path:'doc-dashboard',component:DoctorDashboardComponent},
  {path:'profile',component:DoctorProfileComponent},
  {path:'patient-records',component:PatientRecordsComponent},
  // {path:'clinic-registration',component:ClinicRegistrationComponent},
  {path:'appointments',component:AppointmentDetailsComponent},
  {path:'',redirectTo:'doc-dashboard',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
