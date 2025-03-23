import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinicregistration',
  imports: [CommonModule,FormsModule],
  templateUrl: './clinicregistration.component.html',
  styleUrl: './clinicregistration.component.css'
})
export class ClinicregistrationComponent {
  doctor = {
    fullName: '',
    dob: '',
    gender: '',
    contact: '',
    email: '',
    specialization: '',
    experience: null,
    registrationNumber: '',
    qualification: '',
    hospital: '',
    consultationType: '',
    fee: null,
    availability: '',
    languages: '',
    bio: ''
  };

  specializations = [
    'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 
    'Orthopedic', 'General Physician', 'Gynecologist', 'Psychiatrist'
  ];

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitDoctorForm() {
    console.log('Doctor Profile:', this.doctor);
    alert('Doctor profile registered successfully!');
  }
}
