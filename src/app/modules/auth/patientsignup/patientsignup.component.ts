import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, PatientModel } from '../../../services/auth.service';

@Component({
  selector: 'app-patientsignup',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './patientsignup.component.html',
  styleUrl: './patientsignup.component.css'
})
export class PatientsignupComponent {
  form: FormGroup;
  alertMessage: string = '';
  alertClass: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]]
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

      const patientData: PatientModel = {
        fullName,
        email,
        password
      };

      this.AuthService.signupPatient(patientData).subscribe({
        next: (res) => {
          this.showAlert('Signup successful! Redirecting to dashboard...', 'success');
          localStorage.setItem('PatientId', res.id); 
          
          localStorage.setItem('PatientName', res.fullName); 
          localStorage.setItem('LoggedInPatient', JSON.stringify(res)); 
          setTimeout(() => {
            this.router.navigate(['/patient']);
          }, 2000);
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Signup failed. Try again.';
          console.error(errorMsg);
          this.showAlert(errorMsg, 'danger');
        }
      });
    } else {
      this.showAlert('Please fill in all required fields correctly.', 'danger');
    }
  }
}
