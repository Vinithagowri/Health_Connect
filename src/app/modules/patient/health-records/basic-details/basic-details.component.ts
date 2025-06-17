import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientRecordsService } from '../../../../services/patient-records.service';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent implements OnInit {
  
  patientId: number = 0;
  patient: any = {};
  isEditMode: boolean = false;
  isNew: boolean = false;

  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private patientService: PatientRecordsService) {}

  ngOnInit(): void {
    this.patientId = Number(localStorage.getItem('PatientId'));
    this.loadPatient();
  }

  loadPatient(): void {
    this.patientService.getBasicDetails(this.patientId).subscribe({
      next: (data) => {
        if (data && data.patientId) {
          this.patient = data;
          this.isNew = false;
        } else {
          this.isNew = true;
          this.patient = this.getEmptyPatient();
        }
      },
      error: () => {
        this.showAlertMessage('Failed to load patient data.', 'danger');
      }
    });
  }

  getEmptyPatient() {
    return {
      patientId: this.patientId,
      name: '',
      dateOfBirth: '',
      bloodGroup: '',
      contact: '',
      gender: '',
      emergencyContact: ''
    };
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode && !this.isNew) {
      this.loadPatient(); 
    }
  }

  onSubmit(): void {
    const payload = { ...this.patient, patientId: this.patientId };

    const request$ = this.isNew
      ? this.patientService.createBasicDetails(payload)
      : this.patientService.updateBasicDetails(payload);

    request$.subscribe({
      next: () => {
        this.showAlertMessage(this.isNew ? 'Details created successfully.' : 'Details updated successfully.', 'success');
        this.isEditMode = false;
        this.isNew = false;
      },
      error: () => {
        this.showAlertMessage('Failed to save details.', 'danger');
      }
    });
  }

  showAlertMessage(message: string, type: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }

}
