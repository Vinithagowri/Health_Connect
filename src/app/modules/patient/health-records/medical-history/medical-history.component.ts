import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRecordsService } from '../../../../services/patient-records.service';
@Component({
  selector: 'app-medical-history',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.css'
})
export class MedicalHistoryComponent implements OnInit {
  isEditing: boolean = false;
  patientId: number = Number(localStorage.getItem('PatientId')); 
  alertMessage: string = '';
  alertClass: string = '';

  medicalHistory: any = {
    chronicConditions: [],
    allergies: [],
    pastSurgeries: [],
    familyHistory: ''
  };

  editableHistory: any = { ...this.medicalHistory };

  constructor(private patientRecordsService: PatientRecordsService) {}

  ngOnInit(): void {
    this.fetchMedicalHistory();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editableHistory = { ...this.medicalHistory };
    }
  }
  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertClass = `alert alert-${type}`;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertClass = '';
    }, 3000);
  }
  fetchMedicalHistory(): void {
    this.patientRecordsService.getMedicalHistory(this.patientId).subscribe({
      next: (data) => {
        this.medicalHistory = {
          chronicConditions: (data.chronicConditions || '').split(',').map((item: string) => item.trim()),
          allergies: (data.allergies || '').split(',').map((item: string) => item.trim()),
          pastSurgeries: (data.pastSurgeries || '').split(',').map((item: string) => item.trim()),
          familyHistory: data.familyHistory || ''
        };
        this.editableHistory = { ...this.medicalHistory };
      },
      error: (err) => {
        console.error('Error fetching medical history', err);
      }
    });
  }

  saveDetails(): void {
    const payload = {
      patientId: this.patientId,
      chronicConditions: Array.isArray(this.editableHistory.chronicConditions)
        ? this.editableHistory.chronicConditions.join(', ')
        : this.editableHistory.chronicConditions,
      allergies: Array.isArray(this.editableHistory.allergies)
        ? this.editableHistory.allergies.join(', ')
        : this.editableHistory.allergies,
      pastSurgeries: Array.isArray(this.editableHistory.pastSurgeries)
        ? this.editableHistory.pastSurgeries.join(', ')
        : this.editableHistory.pastSurgeries,
      familyHistory: this.editableHistory.familyHistory
    };

    this.patientRecordsService.addOrUpdateMedicalHistory(payload).subscribe({
      next: () => {
        this.medicalHistory = { ...this.editableHistory };
        this.isEditing = false;
        this.showAlert('Medical history saved successfully.', 'success');
     
      },
      error: (err) => {
        console.error('Error saving medical history', err);
        this.showAlert('Failed to save medical history.', 'danger');
       
      }
    });
  }
}