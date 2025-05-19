import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientloginComponent } from './patientlogin/patientlogin.component';
import { PatientsignupComponent } from './patientsignup/patientsignup.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { DoctorsignupComponent } from './doctorsignup/doctorsignup.component';


const routes: Routes = [
  {path:'pat-login',component:PatientloginComponent},
  {path:'pat-signup',component:PatientsignupComponent},
  {path:'doc-login',component:DoctorloginComponent},
  {path:'doc-signup',component:DoctorsignupComponent},
  // {path:'',redirectTo:'pat-login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
