import { Component } from '@angular/core';
import { DoctorProfileService } from '../../../services/doctor-profile.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';

@Component({
  selector: 'app-search-doctors',
  imports: [FormsModule,CommonModule,RouterModule,PatientNavbarComponent],
  templateUrl: './search-doctors.component.html',
  styleUrl: './search-doctors.component.css'
})
export class SearchDoctorsComponent {
doctors: any[] = [];
  filteredDoctors: any[] = [];
  searchTerm: string = '';

  constructor(private doctorService: DoctorProfileService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.availableDoctors().subscribe((res: any[]) => {
      this.doctors = res;
      this.filteredDoctors = res; // show all at start
    });
  }

  searchDoctors() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.fullName.toLowerCase().includes(term) ||
      doctor.specialization.toLowerCase().includes(term) ||
      doctor.clinicName.toLowerCase().includes(term) ||
      doctor.clinicAddress.toLowerCase().includes(term) ||
      doctor.city.toLowerCase().includes(term) ||
      doctor.state.toLowerCase().includes(term) ||
      doctor.doctorId.toString().includes(term)
    );
  }
}
