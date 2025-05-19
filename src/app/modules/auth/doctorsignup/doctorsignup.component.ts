import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { DoctorModel, DoctorService } from '../../../services/doctor.service';
import {  HttpClientModule } from '@angular/common/http';
 // Adjust path as needed

@Component({
  selector: 'app-doctorsignup',

  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, FormsModule,HttpClientModule],
  templateUrl: './doctorsignup.component.html',
  styleUrl: './doctorsignup.component.css'
})
export class DoctorsignupComponent {
  form: FormGroup;
  alertMessage: string = '';
  alertClass: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertClass = `alert alert-${type}`;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertClass = '';
    }, 3000);
  }

  onSubmit() {
    if (this.form.valid) {
      const { fullName, email, password, confirmPassword } = this.form.value;

      if (password !== confirmPassword) {
        this.showAlert('Passwords do not match!', 'danger');
        return;
      }

      const doctorData: DoctorModel = { fullName, email, password };

      this.doctorService.signupDoctor(doctorData).subscribe({
        next: () => {
          this.showAlert('Signup successful! Redirecting to dashboard...', 'success');
          setTimeout(() => this.router.navigate(['/doctor']), 2000);
        },
        error: (err) => {
          const errorMsg = err.error || 'Signup failed. Try again.';
          console.log(errorMsg);
          this.showAlert(errorMsg, 'danger');
        }
      });
    } else {
      this.showAlert('Please fill all required fields correctly.', 'danger');
    }
  }
}
