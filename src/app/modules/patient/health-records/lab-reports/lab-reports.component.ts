import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  patientId = Number(localStorage.getItem("PatientId")); 
  isLabReportAvailable: boolean = true;
  @ViewChild('fileInput') fileInput!: ElementRef;

alertMessage: string = '';
alertType: 'success' | 'danger' = 'success';
  constructor(private LabReportsService: PatientRecordsService) {}
  
  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.LabReportsService.getLabReports(this.patientId).subscribe({
      next: (res) => {
        console.log('Lab reports loaded:', res);
        this.labReports = res.map(report => ({
          reportId:report.reportId,
          name: report.reportName,
          date: new Date(report.reportDate).toLocaleDateString()
        }));
      },
      error: () => {
        
        this.isLabReportAvailable = false;
      }
    });
  }
  deleteReport(reportId: number): void {
    console.log('Deleting report with ID:', reportId);
    if (confirm('Are you sure you want to delete this report?')) {
      this.LabReportsService.deleteLabReport(reportId).subscribe({
        next: () => {
          this.alertType = 'success';
      this.alertMessage = 'Report Deleted successfully!';
          this.loadReports();
        },
        error: () => {
          this.alertType = 'danger';
      this.alertMessage = 'Failed to Delete report.';
        }
      });
    }
  }
  downloadReport(reportId: number, reportName: string) {
  this.LabReportsService.downloadLabReport(reportId).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportName; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, error => {
    console.error('Download error:', error);
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
      this.alertType = 'success';
      this.alertMessage = 'Report uploaded successfully!';
      this.loadReports();
      this.resetUploadField();
    },
    error: () => {
      this.alertType = 'danger';
      this.alertMessage = 'Failed to upload report.';
      this.resetUploadField();
    }
  });
}

resetUploadField(): void {
  this.fileInput.nativeElement.value = '';
}
  
}