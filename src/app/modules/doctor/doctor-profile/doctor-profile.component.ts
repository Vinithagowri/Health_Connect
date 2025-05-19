
import { Component, OnInit } from '@angular/core';
import { DoctorProfileService } from '../../../services/doctor-profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';

@Component({
  selector: 'app-doctor-profile',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,DoctorNavbarComponent],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit {

  profile: any = {};
  doctorId: number = 0;
  isProfileExist: boolean = false;
  isEditMode: boolean = false;
  doctorName: string = '';
 doctorEmail: string = '';
  constructor(private doctorProfileService: DoctorProfileService) {}

  ngOnInit() {
    this.doctorId = Number(localStorage.getItem("doctorId"));
    const doctor = JSON.parse(localStorage.getItem('loggedInDoctor') || '{}');
    this.doctorName = doctor.fullName;
    this.doctorEmail = doctor.email;
    this.doctorProfileService.getProfile(this.doctorId).subscribe({
      next: (data) => {
        this.profile = data;
        this.isProfileExist = true;
      },
      error: () => {
        this.isProfileExist = false;
      }
    });
  }
  

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
  
  onSubmit() {
    this.profile.doctorId = this.doctorId;

    if (this.isProfileExist) {
      console.log(this.profile);
      this.doctorProfileService.updateProfile(this.profile).subscribe(() => {
        alert('Profile updated successfully');
      });
    } else {
      this.doctorProfileService.createProfile(this.profile).subscribe(() => {
        alert('Profile created successfully');
        this.isProfileExist = true;
      });
    }
  }
}
