import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { DoctorProfileService } from '../../../services/doctor-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { PatientRecordsService } from '../../../services/patient-records.service';

@Component({
  selector: 'app-book-appoitment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PatientNavbarComponent],
  templateUrl: './book-appoitment-form.component.html',
  styleUrl: './book-appoitment-form.component.css'
})
export class BookAppoitmentFormComponent implements OnInit {

  bookingFor: 'self' | 'others' = 'self';

  appointment = {
    appointmentId: 0,
    patientName: '',
    age: 0,
    gender: '',
    contact: '',
    email: '',
    patientId: 0,
    doctorId: 0,
    appointmentDate: '',
    reason: '',
    status: 'Pending',
    doctorName: ""
  };

  loggedInPatient: any = {}; 

  availableDoctors: any[] = [];
  dateInput: string = '';
  timeInput: string = '';
  minDate: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  selectedDoctorAvailableTime: string = '';


  constructor(
    private appointmentService: AppointmentService,
    private doctorProfileService: DoctorProfileService,
    private basicDetailsService: PatientRecordsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setMinDate();
    this.loadDoctors();
    this.setPatientIdFromStorage();
    this.route.queryParams.subscribe(params => {
      const doctorId = params['doctorId'];
      if (doctorId) {
        this.appointment.doctorId = +doctorId;
      }
    });
  }

  setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  loadDoctors() {
    this.doctorProfileService.availableDoctors().subscribe({
      next: (res) => {
        this.availableDoctors = res;
        if (this.appointment.doctorId) {
          const selectedDoctor = this.availableDoctors.find(d => d.doctorId === this.appointment.doctorId);
          if (selectedDoctor) {
            this.appointment.doctorName = selectedDoctor.fullName;
            this.selectedDoctorAvailableTime = selectedDoctor.availability || 'Timing not available';

          }
        }
      },
      error: (err) => console.error('Failed to load doctors', err)
    });
  }

  setPatientIdFromStorage() {
    const id = localStorage.getItem('PatientId');
    if (id) {
      this.appointment.patientId = +id;
      this.basicDetailsService.getBasicDetails(this.appointment.patientId).subscribe({
        next: (data) => {
          if (data && data.patientId) {
            this.loggedInPatient = data;
            this.prefillForSelf();
          } else {
            console.error('No patient data found');
          }
        },
        error: () => {
          console.error('Failed to load patient data');
        }
      });

      this.prefillForSelf();
    }
  }
  onDoctorChange() {
  const selectedDoctor = this.availableDoctors.find(d => d.doctorId === this.appointment.doctorId);
  if (selectedDoctor) {
    this.selectedDoctorAvailableTime = selectedDoctor.availability || 'Timing not available';
  } else {
    this.selectedDoctorAvailableTime = '';
  }
}
  onBookingForChange() {
    if (this.bookingFor === 'self') {
      this.prefillForSelf();
    } else {
      this.clearAppointmentFields();
    }
  }

  prefillForSelf() {
    console.log(this.loggedInPatient);
    const dob = new Date(this.loggedInPatient.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    const patient = JSON.parse(localStorage.getItem('LoggedInPatient') || '{}');
    
    this.appointment.patientName = this.loggedInPatient.name;
    this.appointment.age = age;
    this.appointment.gender = this.loggedInPatient.gender;
    this.appointment.contact = this.loggedInPatient.contact;
    this.appointment.email = patient.email;
  }

  clearAppointmentFields() {
    this.appointment.patientName = '';
    this.appointment.age = 0;
    this.appointment.gender = '';
    this.appointment.contact = '';
    this.appointment.email = '';
  }

  submitForm() {
  
  const [year, month, day] = this.dateInput.split('-').map(Number);
  const [hour, minute] = this.timeInput.split(':').map(Number);
  const combinedDateTime = new Date(year, month - 1, day, hour, minute);


  const now = new Date();
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  if (combinedDateTime < twoHoursLater) {
    this.alertType = 'danger';
    this.alertMessage = 'Please choose a time at least 2 hours from now.';
    return;
  }


  this.appointment.appointmentDate = combinedDateTime.toISOString();

  this.appointmentService.makeAppointment(this.appointment).subscribe({
    next: () => {
      this.router.navigate(['/patient/appointment-confirmation']);
    },
    error: (err) => {
      this.alertType = 'danger';
      this.alertMessage = 'Failed to book appointment: ' + (err.error?.message || 'Unknown error');
    }
  });
}

}
