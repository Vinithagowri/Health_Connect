import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRecordsService } from '../../../../services/patient-records.service';

interface Hospitalization {
  place: string;
  duration: string;
  issue: string;
  recoveryStatus: string;
  admissionDate: string;
  dischargeDate: string;
  doctor: string;
}
@Component({
  selector: 'app-hospitalization',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './hospitalization.component.html',
  styleUrl: './hospitalization.component.css'
})

export class HospitalizationComponent implements OnInit {
  hospitalizations: any[] = [];
  isEditing = false;
  editingIndex: number | null = null;
  newHospitalization: any = this.resetHospitalization();
  alertMessage: string = '';
alertType: 'success' | 'danger' = 'success';
  patientId: number = Number(localStorage.getItem('PatientId')); 

  constructor(private hospitalizationService: PatientRecordsService) {}

  ngOnInit(): void {
    this.loadHospitalizations();
  }

  loadHospitalizations(): void {
    this.hospitalizationService.getHospitalizations(this.patientId).subscribe({
      next: (data) => this.hospitalizations = data,
      error: (err) => console.error('Error loading records:', err)
    });
  }

  addHospitalization(): void {
    this.newHospitalization.patientId = this.patientId;

    this.hospitalizationService.addHospitalization(this.newHospitalization).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Record added successfully';
        this.loadHospitalizations();
        this.newHospitalization = this.resetHospitalization();
        this.isEditing = false;
        this.editingIndex = null;
      },
      error: (err) => console.error('Error adding record:', err)
    });
  }

  editHospitalization(index: number): void {
    this.isEditing = true;
    this.editingIndex = index;
    this.newHospitalization = { ...this.hospitalizations[index] };
  }

  deleteHospitalization(id: number): void {
    if(confirm('Are you sure you want to delete this record?')) {
    this.hospitalizationService.deleteHospitalization(id).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Record deleted successfully';
        this.loadHospitalizations();
        
      },
      error: (err) => console.error('Error deleting record:', err)
    });
  }
  }

  resetHospitalization(): any {
    return {
      patientId: 0,
      place: '',
      duration: '',
      issue: '',
      recoveryStatus: '',
      admissionDate: '',
      dischargeDate: '',
      doctor: ''
    };
  }
}