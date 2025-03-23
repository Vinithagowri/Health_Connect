import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-doctorappointments',
  imports: [CommonModule],
  templateUrl: './doctorappointments.component.html',
  styleUrl: './doctorappointments.component.css'
})
export class DoctorappointmentsComponent {
  appointments = [
    {
      patientName: 'John Doe',
      age: 28,
      gender: 'Male',
      contact: '+91 9876543210',
      date: '2025-03-06',
      time: '10:30 AM',
      reason: 'Fever and cold',
      status: 'Confirmed'
    },
    {
      patientName: 'Mary Smith',
      age: 35,
      gender: 'Female',
      contact: '+91 9345678901',
      date: '2025-03-07',
      time: '2:00 PM',
      reason: 'Headache and dizziness',
      status: 'Pending'
    },
    {
      patientName: 'Rahul Verma',
      age: 40,
      gender: 'Male',
      contact: '+91 8765432109',
      date: '2025-03-08',
      time: '4:15 PM',
      reason: 'Routine Checkup',
      status: 'Cancelled'
    }
  ];
}
