import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { BookAppoitmentFormComponent } from './book-appoitment-form/book-appoitment-form.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { HealthRecordsModule } from './health-records/health-records.module';
import { AppintmentConfirmationComponent } from './appintment-confirmation/appintment-confirmation.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';


// const routes: Routes = [
//   {path:'pat-dashboard',component:PatientDashboardComponent},
//     {path:'book-appointment',component:BookAppoitmentFormComponent},
//     {path:'appoint-history',component:AppointmentHistoryComponent},
//     {path:'health-record',loadChildren:()=>import('./health-records/health-records.module').then(m => m.HealthRecordsModule)},
//     {path:'',redirectTo:'pat-dashboard',pathMatch:'full'},
// ];
const routes: Routes = [
  { path: 'patient-home', component: PatientHomeComponent },
  { path: 'patient-dashboard', component: PatientDashboardComponent },
  { path: 'book-appointment', component: BookAppoitmentFormComponent },
  { path: 'appoint-history', component: AppointmentHistoryComponent },
  { path: 'appointment-confirmation', component: AppintmentConfirmationComponent },
  { path: 'search-doctor', component: SearchDoctorsComponent },
  { path: 'health-record', loadChildren: () => import('./health-records/health-records.module').then(m => m.HealthRecordsModule) },
  { path: '', redirectTo: 'patient-home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
