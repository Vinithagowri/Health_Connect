import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRecordsService } from '../../../../services/patient-records.service';

@Component({
  selector: 'app-lab-reports',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './lab-reports.component.html',
  styleUrl: './lab-reports.component.css'
})
export class LabReportsComponent implements OnInit {
  labReports: any[] = [];
  patientId = Number(localStorage.getItem("PatientId")); // Replace with dynamic patient ID if needed

  constructor(private LabReportsService: PatientRecordsService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.LabReportsService.getLabReports(this.patientId).subscribe({
      next: (res) => {
        this.labReports = res.map(report => ({
          name: report.reportName,
          date: new Date(report.reportDate).toLocaleDateString()
        }));
      },
      error: () => {
        alert('Failed to load lab reports.');
      }
    });
  }

  uploadReport(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', this.patientId.toString());
    formData.append('reportName', file.name);
    formData.append('reportDate', new Date().toISOString());

    this.LabReportsService.addLabReport(formData).subscribe({
      next: () => {
        alert('Report uploaded successfully!');
        this.loadReports();
      },
      error: () => {
        alert('Failed to upload report.');
      }
    });
  }
  
}