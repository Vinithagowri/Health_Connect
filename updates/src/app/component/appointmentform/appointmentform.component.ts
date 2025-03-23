import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointmentform',
  imports: [CommonModule,FormsModule],
  templateUrl: './appointmentform.component.html',
  styleUrl: './appointmentform.component.css'
})
export class AppointmentformComponent {
  appointment = {
    fullName: '',
    age: null,
    gender: '',
    contact: '',
    email: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  };

  // Sample doctor list (Replace with API data later)
  doctors = ['Dr. Smith (Cardiologist)', 'Dr. Brown (Dentist)', 'Dr. Johnson (Dermatologist)'];

  submitForm() {
    console.log('Appointment Details:', this.appointment);
    alert('Appointment booked successfully!');
  }
}
