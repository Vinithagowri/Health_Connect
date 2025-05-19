import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { DoctorProfileService } from '../../../services/doctor-profile.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-book-appoitment-form',
  imports: [CommonModule,FormsModule,PatientNavbarComponent],
  templateUrl: './book-appoitment-form.component.html',
  styleUrl: './book-appoitment-form.component.css'
})
export class BookAppoitmentFormComponent implements OnInit {

  appointment = {
    appointmentId: 0,
    patientName: '',
    age: 0,
    gender: '',
    contact: '',
    email: '',
    patientId: 0, // Set this from logged-in patient or route
    doctorId: 0,
    appointmentDate: '', // '2025-04-12T07:40:28.742Z'
    reason: '',
    status: 'Pending',
    doctorName:"" // Default status
  };

  availableDoctors: any[] = [];
  dateInput: string = '';
 timeInput: string = '';
  constructor(
    private appointmentService: AppointmentService,
    private doctorProfileService: DoctorProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.setPatientIdFromStorage(); // optional: if patient ID is stored locally
  }

  loadDoctors() {
    this.doctorProfileService.availableDoctors().subscribe({
      next: (res) => this.availableDoctors = res,
      error: (err) => console.error('Failed to load doctors', err)
    });
  }

  setPatientIdFromStorage() {
    const id = localStorage.getItem('PatientId');
    if (id) this.appointment.patientId = +id;
  }

  
alertMessage: string = '';
alertType: 'success' | 'danger' = 'success'; 

submitForm() {
  const combinedDateTime = new Date(`${this.dateInput}T${this.timeInput}`);
  this.appointment.appointmentDate = combinedDateTime.toISOString();
  console.log('Submitting appointment:', this.appointment);

  this.appointmentService.makeAppointment(this.appointment).subscribe({
    next: () => {
      // this.alertType = 'success';
      // this.alertMessage = 'Appointment booked successfully';
      // setTimeout(() => {
      //   this.router.navigate(['/patient/appointments']);
      // }, 2000); 
      this.router.navigate(['/patient/appointment-confirmation']);

    },
    error: (err) => {
      this.alertType = 'danger';
      this.alertMessage = 'Failed to book appointment: ' + (err.error?.message || 'Unknown error');
    }
  });
}

}