import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRecordsService } from '../../../../services/patient-records.service';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent implements OnInit {
  patientId: number = Number(localStorage.getItem('PatientId'));
  patient: any = {};
  editablePatient: any = {};
  isEditing = false;
  isNew = false;

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
          this.editablePatient = { ...data };
          this.isNew = false;
        } else {
          // No data found, treat as new patient
          this.setEmptyPatient();
        }
      },
      error: (err) => {
        console.error('Error loading data:', err);
        alert('Failed to load patient data.');
      }
    });
  }

  setEmptyPatient(): void {
    this.isNew = true;
    this.patient = {
      patientId: this.patientId,
      name: '',
      dob: '',
      bloodGroup: '',
      contact: '',
      gender: '',
      emergencyContact: ''
    };
    this.editablePatient = { ...this.patient };
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editablePatient = { ...this.patient };
    }
  }

  saveDetails(): void {
    const payload = { ...this.editablePatient, patientId: this.patientId };
    const isCreating = this.isNew;

    const request$ = isCreating
      ? this.patientService.createBasicDetails(payload)
      : this.patientService.updateBasicDetails(payload);

    request$.subscribe({
      next: (res) => {
        console.log('Save successful', res);
        this.patient = { ...this.editablePatient };
        this.isEditing = false;
        this.isNew = false;
        alert(isCreating ? 'Created successfully' : 'Updated successfully');
      },
      error: (err) => {
        console.error('Save failed:', err);
        alert('Failed to save patient details.');
      }
    });
  }
}
