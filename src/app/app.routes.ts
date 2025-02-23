import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PatientloginComponent } from './component/patientlogin/patientlogin.component';
import { PatientsignupComponent } from './component/patientsignup/patientsignup.component';
import { DoctorloginComponent } from './component/doctorlogin/doctorlogin.component';
import { DoctorsignupComponent } from './component/doctorsignup/doctorsignup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patientlogin', component: PatientloginComponent },
    { path: 'patientsignup', component: PatientsignupComponent },
    { path: 'doctorlogin', component: DoctorloginComponent },
    { path: 'doctorsignup', component: DoctorsignupComponent },
];
