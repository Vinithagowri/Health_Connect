import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthRecordManegeComponent } from './health-record-manege/health-record-manege.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { HospitalizationComponent } from './hospitalization/hospitalization.component';
import { LabReportsComponent } from './lab-reports/lab-reports.component';
import { MedicationsComponent } from './medications/medications.component';

const routes: Routes = [
  { 
    path: '', 
    component: HealthRecordManegeComponent, 
    children: [
      { path: 'basic-details', component: BasicDetailsComponent },
      { path: 'medical-history', component: MedicalHistoryComponent },
      { path: 'medications', component: MedicationsComponent },
      { path: 'lab-reports', component: LabReportsComponent },
      { path: 'hospitalization', component: HospitalizationComponent },
      { path: '', redirectTo: 'basic-details', pathMatch: 'full' } // Default page
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRecordsRoutingModule {
  
 }
