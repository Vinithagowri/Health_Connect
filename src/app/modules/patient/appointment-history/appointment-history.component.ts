import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-appointment-history',
  imports: [CommonModule,FormsModule,PatientNavbarComponent],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})
export class AppointmentHistoryComponent implements OnInit {
  appointments: any[] = [];
  patientId: any = localStorage.getItem("PatientId");

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
      }
    });
  }

  cancelAppointment(appointmentId: number) {
    const confirmCancel = confirm("Are you sure you want to cancel this appointment?");
    
    if (!confirmCancel) return;
    console.log("Cancelling appointment with ID:", appointmentId);
    const status='Cancelled';
    this.appointmentService.updateAppointmentStatus(appointmentId,status).subscribe({
      next: () => {
        this.appointments = this.appointments.map(appt =>
          appt.appointmentId === appointmentId ? { ...appt, status: 'Cancelled' } : appt
        );
        alert("Appointment cancelled successfully.");
      },
      error: (err) => {
        console.error("Failed to cancel appointment", err);
        alert("Failed to cancel appointment.");
      }
    });
  }
}