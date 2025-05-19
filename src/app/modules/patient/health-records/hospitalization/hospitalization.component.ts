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

  deleteHospitalization(index: number): void {
    // No delete API yet, so just remove from view
    this.hospitalizations.splice(index, 1);
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