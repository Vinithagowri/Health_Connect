import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PatientloginComponent } from './modules/auth/patientlogin/patientlogin.component';
import { PatientsignupComponent } from './modules/auth/patientsignup/patientsignup.component';
import { DoctorloginComponent } from './modules/auth/doctorlogin/doctorlogin.component';
import { DoctorsignupComponent } from './modules/auth/doctorsignup/doctorsignup.component';
import { HealthRecordsModule } from './modules/patient/health-records/health-records.module';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path:'auth',loadChildren:()=>import('./modules/auth/auth.module').then(m => m.AuthModule)},
    {path:'patient',loadChildren:()=>import('./modules/patient/patient.module').then(m => m.PatientModule)},
    {path:'doctor',loadChildren:()=>import('./modules/doctor/doctor.module').then(m => m.DoctorModule)},
    {path: 'patient/health-records',
     loadChildren: () => import('./modules/patient/health-records/health-records.module').then(m => m.HealthRecordsModule)},
    {path:'**',redirectTo:'auth'},
    // { path: 'patientlogin', component: PatientloginComponent },
    // { path: 'patientsignup', component: PatientsignupComponent },
    // { path: 'doctorlogin', component: DoctorloginComponent },
    // { path: 'doctorsignup', component: DoctorsignupComponent },
];
