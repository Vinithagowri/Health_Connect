import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { PatientService, LoginModel } from '../../../services/patient.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patientlogin',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './patientlogin.component.html',
  styleUrl: './patientlogin.component.css'
})
export class PatientloginComponent {
  form: FormGroup;
  alertMessage: string = '';
  alertClass: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
      const loginData: LoginModel = this.form.value;

      this.patientService.loginPatient(loginData).subscribe({
        next: (res) => {
          this.showAlert('Login successful! Redirecting to dashboard...', 'success');
          localStorage.setItem('PatientId', res.id); // 👈 Add this
           // 👈 Add this for debugging
          localStorage.setItem('PatientName', res.fullName); // Optional, for greetings etc.
          localStorage.setItem('LoggedInPatient', JSON.stringify(res)); // Still keep full object if needed
          console.log(localStorage.getItem('PatientId')); // 👈 Add this for debugging
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['/patient']);
          }, 2000);
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Invalid email or password.';
          console.error(errorMsg);
          this.showAlert(errorMsg, 'danger');
        }
      });
    } else {
      this.showAlert('Please enter valid credentials.', 'danger');
    }
  }
}
