import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';

@Component({
  selector: 'app-doctor-home',
  imports: [DoctorNavbarComponent,RouterLink,CommonModule],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css'
})
export class DoctorHomeComponent {
  UserName= 'Dr '+localStorage.getItem('doctorName');

}
