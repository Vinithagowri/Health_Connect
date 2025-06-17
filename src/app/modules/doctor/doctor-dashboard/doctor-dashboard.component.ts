import { Component, OnInit } from '@angular/core';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { DoctorRoutingModule } from '../doctor-routing.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../services/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [DoctorNavbarComponent,CommonModule,FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  appointments: any[] = [];
  upcomingAppointments: any[] = [];
  doctorId: number = Number(localStorage.getItem('doctorId'));

  totalAppointments: number = 0;
  pendingAppointments: number = 0;
  completedAppointments: number = 0;
  cancelledAppointments: number = 0;
  newAppointments: number = 0;

  showTodayAppointments: boolean = false;
  showActionNeededAppointments: boolean = false;
  displayedAppointments: any[] = [];
  currentSectionTitle: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe(data => {
      this.appointments = data;

      this.totalAppointments = this.appointments.length;
      this.pendingAppointments = this.appointments.filter(a => a.status === 'Pending').length;
      this.completedAppointments = this.appointments.filter(a => a.status === 'Completed').length;
      this.cancelledAppointments = this.appointments.filter(a => a.status === 'Cancelled').length;

      const today = new Date().toDateString();
      this.newAppointments = this.appointments.filter(a =>
        new Date(a.appointmentDate).toDateString() === today
      ).length;

      this.upcomingAppointments = this.appointments.filter(a =>
        a.status === 'Pending' || a.status === 'Confirmed'
      );
    });
  }

  toggleTodayAppointments() {
    this.showActionNeededAppointments = false;
    this.showTodayAppointments = !this.showTodayAppointments;

    if (this.showTodayAppointments) {
      const today = new Date().toDateString();
      this.displayedAppointments = this.appointments.filter(a =>
        new Date(a.appointmentDate).toDateString() === today
      );
      this.currentSectionTitle = "Today's Appointments";
    } else {
      this.displayedAppointments = [];
    }
  }

  toggleActionNeededAppointments() {
    this.showTodayAppointments = false;
    this.showActionNeededAppointments = !this.showActionNeededAppointments;

    if (this.showActionNeededAppointments) {
      this.displayedAppointments = this.upcomingAppointments;
      this.currentSectionTitle = "Action Needed Appointments";
    } else {
      this.displayedAppointments = [];
    }
  }
  updateStatus(id: number, status: string, app: any) {
  app.updating = true;  
  this.appointmentService.updateAppointmentStatus(id, status).subscribe({
    next: () => {
      this.loadAppointments();  
      app.updating = false;
     
    },
    error: () => {
      app.updating = false;  
      alert('Failed to update status. Please try again.');
    }
  });
}


  goToAppointmentsPage() {
    this.router.navigate(['/doctor/appointments']);
  }

  goToPatientHistory() {
    this.router.navigate(['/doctor/patient-records']);
  }
}
