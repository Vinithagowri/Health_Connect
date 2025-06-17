import { Component, OnInit } from '@angular/core';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  imports: [PatientNavbarComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {

  appointmentHistory:any = [];
  patientId: any = localStorage.getItem("PatientId");

  // Dashboard values
  totalAppointments :number = 0;
  pendingAppointments = 0;
  completedAppointments = 0;
  cancelledAppointments = 0;
  showAllAppointments=false;
  showAllDoctors=false;
  recentlyVisitedDoctors: any[] = [];
  upcomingAppointments: any[] = [];
  notifications: string[] = [];

  constructor(
      private appointmentService: AppointmentService,
      private router: Router
    ) {}

  ngOnInit(): void {
     this.loadappointments();
   
   
  }
  loadappointments() {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.appointmentHistory = data;
        this.calculateDashboardInfo();
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
      }
    });
  }
  calculateDashboardInfo() {
    const doctorMap = new Map<number, any>();

    this.totalAppointments = this.appointmentHistory.length;

    this.pendingAppointments = this.appointmentHistory.filter((a:any) => a.status === 'Pending').length;

    this.cancelledAppointments = this.appointmentHistory.filter((a:any) => a.status === 'Cancelled').length;

    this.completedAppointments = this.appointmentHistory.filter((a:any) => a.status === 'Confirmed').length;

   
    this.appointmentHistory.forEach((a:any) => {
      if (!doctorMap.has(a.doctorId)) {
        doctorMap.set(a.doctorId, {
          doctorName: a.doctorName,
          doctorId: a.doctorId,
         
          lastAppointmentDate: a.appointmentDate
        });
      }
    });
    this.recentlyVisitedDoctors = Array.from(doctorMap.values());

   
    const today = new Date();
    this.upcomingAppointments = this.appointmentHistory
      .filter((a:any) => new Date(a.appointmentDate) > today && a.status === 'Pending')
      .sort((a: any, b:any) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
      .slice(0, 3);
  }
  bookAgain(doctorId:number){

  }
  goToAppointmentHistory() {
    this.router.navigate(['/patient/appoint-history']);
  }

  goToHealthRecord() {
    this.router.navigate(['/patient/health-record']);
  }
}