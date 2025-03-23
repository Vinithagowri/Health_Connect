import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PatientloginComponent } from './component/patientlogin/patientlogin.component';
import { PatientsignupComponent } from './component/patientsignup/patientsignup.component';
import { DoctorloginComponent } from './component/doctorlogin/doctorlogin.component';
import { DoctorsignupComponent } from './component/doctorsignup/doctorsignup.component';
import { DoctordashboardComponent } from './component/doctordashboard/doctordashboard.component';
import { PatientdashboardComponent } from './component/patientdashboard/patientdashboard.component';
import { AppointmentformComponent } from './component/appointmentform/appointmentform.component';
import { ClinicregistrationComponent } from './component/clinicregistration/clinicregistration.component';
import { DoctorappointmentsComponent } from './component/doctorappointments/doctorappointments.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'patientlogin', component: PatientloginComponent },
    { path: 'patientsignup', component: PatientsignupComponent },
    { path: 'doctorlogin', component: DoctorloginComponent },
    { path: 'doctorsignup', component: DoctorsignupComponent },
    { path: 'docdash', component: DoctordashboardComponent},
    { path: 'patdash', component: PatientdashboardComponent},
    { path: 'make-appointment', component: AppointmentformComponent},
    { path: 'clinic-reg', component: ClinicregistrationComponent},
    { path: 'view-appoint', component: DoctorappointmentsComponent},
];
