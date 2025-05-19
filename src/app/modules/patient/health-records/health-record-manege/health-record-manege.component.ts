import { Component } from '@angular/core';
import { HealthRecordsRoutingModule } from '../health-records-routing.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PatientNavbarComponent } from '../../patient-navbar/patient-navbar.component';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { MedicationsComponent } from '../medications/medications.component';
import { LabReportsComponent } from '../lab-reports/lab-reports.component';
import { HospitalizationComponent } from '../hospitalization/hospitalization.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-health-record-manege',
  imports: [CommonModule,FormsModule, SidebarComponent, PatientNavbarComponent, BasicDetailsComponent, MedicalHistoryComponent, MedicationsComponent, LabReportsComponent, HospitalizationComponent],
  templateUrl: './health-record-manege.component.html',
  styleUrl: './health-record-manege.component.css'
})
export class HealthRecordManegeComponent {
  activeComponent = 'basic-details'; // Default component

  changeComponent(componentName: string) {
    this.activeComponent = componentName;
  }
}
