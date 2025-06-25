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
  filteredAppointments: any[] = [];
  patientId: any = localStorage.getItem("PatientId");

  // Filters
  doctorNameFilter: string = '';
  patientNameFilter: string = '';
  dateFilter: string = '';
  statusFilter: string = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.appointments = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
      }
    });
  }

  applyFilters() {
    this.filteredAppointments = this.appointments.filter(appt => {
      const matchesDoctor = this.doctorNameFilter
        ? appt.doctorName?.toLowerCase().includes(this.doctorNameFilter.toLowerCase())
        : true;

      const matchesPatient = this.patientNameFilter
        ? appt.patientName?.toLowerCase().includes(this.patientNameFilter.toLowerCase())
        : true;

      const matchesDate = this.dateFilter
        ? new Date(appt.appointmentDate).toISOString().slice(0, 10) === this.dateFilter
        : true;

      const matchesStatus = this.statusFilter
        ? appt.status === this.statusFilter
        : true;

      return matchesDoctor && matchesPatient && matchesDate && matchesStatus;
    });
  }
  clearFilters() {
  this.doctorNameFilter = '';
  this.patientNameFilter = '';
  this.dateFilter = '';
  this.statusFilter = '';
  this.applyFilters();
}
upcomingAppointments(): any[] {
  const today = new Date();
  return this.filteredAppointments.filter(appt => new Date(appt.appointmentDate) >= today);
}

pastAppointments(): any[] {
  const today = new Date();
  return this.filteredAppointments.filter(appt => new Date(appt.appointmentDate) < today);
}
getStatusClass(status: string): string {
  return {
    'Pending': 'bg-warning',
    'Confirmed': 'bg-primary',
    'Completed': 'bg-success',
    'Cancelled': 'bg-danger'
  }[status] || 'bg-secondary';
}
  cancelAppointment(appointmentId: number) {
    const confirmCancel = confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    const status = 'Cancelled';
    this.appointmentService.updateAppointmentStatus(appointmentId, status).subscribe({
      next: () => {
        this.appointments = this.appointments.map(appt =>
          appt.appointmentId === appointmentId ? { ...appt, status: 'Cancelled' } : appt
        );
        this.applyFilters();
        alert("Appointment cancelled successfully.");
      },
      error: (err) => {
        console.error("Failed to cancel appointment", err);
        alert("Failed to cancel appointment.");
      }
    });
  }
  appointmentsPerPage = 6;


currentUpcomingPage = 1;

currentPastPage = 1;

get paginatedUpcomingAppointments(): any[] {
  const start = (this.currentUpcomingPage - 1) * this.appointmentsPerPage;
  return this.upcomingAppointments().slice(start, start + this.appointmentsPerPage);
}

get paginatedPastAppointments(): any[] {
  const start = (this.currentPastPage - 1) * this.appointmentsPerPage;
  return this.pastAppointments().slice(start, start + this.appointmentsPerPage);
}

get totalUpcomingPages(): number {
  return Math.ceil(this.upcomingAppointments().length / this.appointmentsPerPage);
}

get totalPastPages(): number {
  return Math.ceil(this.pastAppointments().length / this.appointmentsPerPage);
}

changeUpcomingPage(page: number): void {
  this.currentUpcomingPage = page;
}

changePastPage(page: number): void {
  this.currentPastPage = page;
}

}