import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';

@Component({
  selector: 'app-patient-home',
  imports: [CommonModule,PatientNavbarComponent],
  templateUrl: './patient-home.component.html',
  styleUrl: './patient-home.component.css'
})
export class PatientHomeComponent {
  UserName=localStorage.getItem("PatientName")?.toLocaleUpperCase();
}
