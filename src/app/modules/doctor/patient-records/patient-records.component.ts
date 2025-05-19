import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-records',
  imports: [DoctorNavbarComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './patient-records.component.html',
  styleUrl: './patient-records.component.css'
})
export class PatientRecordsComponent implements OnInit {
  patientRecords: any[] = [];
  filteredRecords: any[] = [];
  doctorId: number = Number(localStorage.getItem("doctorId"));

  searchTerm: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadPatientRecords();
  }

  loadPatientRecords() {
    this.appointmentService.getCompletedAppointmentsByDoctor(this.doctorId)
      .subscribe(data => {
        this.patientRecords = data;
        this.filteredRecords = [...this.patientRecords];
      });
  }

  filterRecords() {
    this.filteredRecords = this.patientRecords.filter(record => {
      const matchesName = this.searchTerm
        ? record.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const appointmentDate = new Date(record.appointmentDate);
      const matchesFrom = this.fromDate ? appointmentDate >= new Date(this.fromDate) : true;
      const matchesTo = this.toDate ? appointmentDate <= new Date(this.toDate) : true;

      return matchesName && matchesFrom && matchesTo;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredRecords = [...this.patientRecords];
  }
}
