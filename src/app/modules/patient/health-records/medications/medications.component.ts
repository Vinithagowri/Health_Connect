import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientRecordsService } from '../../../../services/patient-records.service';

@Component({
  selector: 'app-medications',
  imports: [CommonModule,FormsModule],
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.css'
})
export class MedicationsComponent implements OnInit {
  medications: any[] = [];
  newMedication: any = {
    medicationName: '',
    dosage: '',
    frequency: '',
    status: 'Ongoing',
    startDate: '',
    endDate: '',
    notes: ''
  };

  patientId: number = Number(localStorage.getItem('PatientId'));

  constructor(private medicationService: PatientRecordsService) {}

  ngOnInit(): void {
    this.fetchMedications();
  }

  fetchMedications(): void {
    this.medicationService.getMedications(this.patientId).subscribe({
      next: (data) => {
        this.medications = data;
      },
      error: (err) => {
        console.error('Failed to fetch medications:', err);
      }
    });
  }

  addMedication(): void {
    const medToAdd = {
      ...this.newMedication,
      startDate: this.formatDateOnly(this.newMedication.startDate),
  endDate: this.formatDateOnly(this.newMedication.endDate),
      patientId: this.patientId
    };

    this.medicationService.addMedication(medToAdd).subscribe({
      next: () => {
        this.fetchMedications();
        this.newMedication = {
          medicationName: '',
          dosage: '',
          frequency: '',
          status: 'Ongoing',
          startDate: '',
          endDate: '',
          notes: ''
        };
      },
      error: (err) => {
        console.error('Failed to add medication:', err);
      }
    });
  }
  formatDateOnly(date: Date): string {
    
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        console.error('Invalid date value passed to formatDateOnly:', date);
        return '';
      }
      return d.toISOString().split('T')[0];
     // 'YYYY-MM-DD'
  }
  markAsTaken(index: number): void {
    this.medications[index].status = this.medications[index].status === 'Completed' ? 'Ongoing' : 'Completed';
  }

  removeMedication(MedicationId:number): void {
    if (confirm('Are you sure you want to delete this medication?')) {
      this.medicationService.deleteMedication(MedicationId).subscribe({
        next: () => {
          this.fetchMedications();
        },
        error: (err) => {
          console.error('Failed to delete medication:', err);
        }
      });
    }
  }
}