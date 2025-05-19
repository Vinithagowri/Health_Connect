import { Component } from '@angular/core';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { DoctorRoutingModule } from '../doctor-routing.module';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [DoctorNavbarComponent,RouterLink,CommonModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {
  UserName= 'Dr '+localStorage.getItem('doctorName');
}
