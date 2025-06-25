import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { AppointmentService } from '../../../services/appointment.service';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-appointment-details',
  imports: [CommonModule, FormsModule, DoctorNavbarComponent, ReactiveFormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent implements OnInit {
  appointments: any[] = [];
  doctorId: number = Number(localStorage.getItem("doctorId"));
  searchTerm: string = '';
  statusFilter: string = '';
  sortColumn: string = 'appointmentDate';
  sortAsc: boolean = true;
  appointmentsPerPage = 5;


  currentUpcomingPage = 1;

  currentPastPage = 1;
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe(data => {
      this.appointments = data;
    });
  }

  updateStatus(id: number, status: string) {
    this.appointmentService.updateAppointmentStatus(id, status).subscribe(() => {
      this.loadAppointments();
    });
  }

  filteredAndSortedAppointments(): any[] {
    let filtered = this.appointments;

    if (this.searchTerm) {
      filtered = filtered.filter(a =>
        a.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(a => a.status === this.statusFilter);
    }


    filtered = filtered.sort((a, b) => {
      const statusOrder = (s: string) =>
        s === 'Pending' ? 1 : s === 'Confirmed' ? 2 : 3;
      const statusDiff = statusOrder(a.status) - statusOrder(b.status);
      if (statusDiff !== 0) return statusDiff;

      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (aValue < bValue) return this.sortAsc ? -1 : 1;
      if (aValue > bValue) return this.sortAsc ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-cell status-pending';
      case 'Confirmed': return 'status-cell status-confirmed';
      case 'Completed': return 'status-cell status-completed';
      case 'Cancelled': return 'status-cell status-cancelled';
      default: return 'status-cell';
    }
  }


  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.sortColumn = 'appointmentDate';
    this.sortAsc = true;
  }

  upcomingAppointments(): any[] {
    const today = new Date();

    return this.filteredAndSortedAppointments().filter(app =>
      new Date(app.appointmentDate) >= today
    );
  }

  pastAppointments(): any[] {
    const today = new Date();

    return this.filteredAndSortedAppointments().filter(app =>
      new Date(app.appointmentDate) < today
    );
  }


  get paginatedUpcomingAppointments(): any[] {
    const startIndex = (this.currentUpcomingPage - 1) * this.appointmentsPerPage;
    return this.upcomingAppointments().slice(startIndex, startIndex + this.appointmentsPerPage);
  }

  get paginatedPastAppointments(): any[] {
    const startIndex = (this.currentPastPage - 1) * this.appointmentsPerPage;
    return this.pastAppointments().slice(startIndex, startIndex + this.appointmentsPerPage);
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