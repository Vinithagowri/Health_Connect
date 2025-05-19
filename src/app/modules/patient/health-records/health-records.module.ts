import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRecordsRoutingModule } from './health-records-routing.module';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { HealthRecordManegeComponent } from './health-record-manege/health-record-manege.component';
import { HospitalizationComponent } from './hospitalization/hospitalization.component';
import { LabReportsComponent } from './lab-reports/lab-reports.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { MedicationsComponent } from './medications/medications.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HealthRecordsRoutingModule,
    HealthRecordManegeComponent,
    BasicDetailsComponent,
    MedicalHistoryComponent,
    HospitalizationComponent,
    LabReportsComponent,
    MedicationsComponent
  ]
})
export class HealthRecordsModule { }
