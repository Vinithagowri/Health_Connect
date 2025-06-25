import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AuthService, LoginModel } from '../../../services/auth.service';

@Component({
  selector: 'app-patientlogin',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, FormsModule, HttpClientModule,RouterModule],
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
    private AuthService: AuthService
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

      this.AuthService.loginPatient(loginData).subscribe({
        next: (res) => {
          
          this.showAlert('Login successful! Redirecting to dashboard...', 'success');
          localStorage.setItem('AuthToken', res.token);
          localStorage.setItem('PatientId', res.patient.id); 
          
          localStorage.setItem('PatientName', res.patient.fullname); 
          localStorage.setItem('LoggedInPatient', JSON.stringify(res.patient)); 
          
          setTimeout(() => {
            this.router.navigate(['/patient']);
          }, 2000);
        },
        error: (err) => {
          let errorMsg = 'Something went wrong. Please try again later.';
          if (err.status === 0) {
            
            errorMsg = 'Cannot connect to the server. Please check your internet connection or try again later.';
          }
          else{
            errorMsg = err.error?.message || 'Invalid email or password.';
          } 
          
          this.showAlert(errorMsg, 'danger');
        }
      });
    } else {
      this.showAlert('Please fill all fields Correctly', 'danger');
    }
  }
}
