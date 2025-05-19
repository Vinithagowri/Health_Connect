import { Component } from '@angular/core';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  imports: [PatientNavbarComponent,CommonModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
  UserName=localStorage.getItem("PatientName")?.toLocaleUpperCase();
}
