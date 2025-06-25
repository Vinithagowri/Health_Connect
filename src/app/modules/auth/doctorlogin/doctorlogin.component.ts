import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../../pages/navbar/navbar.component';
import { AuthService, LoginModel } from '../../../services/auth.service';


@Component({
  selector: 'app-doctorlogin',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, FormsModule,RouterModule],
  templateUrl: './doctorlogin.component.html',
  styleUrl: './doctorlogin.component.css'
})
export class DoctorloginComponent {
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

      this.AuthService.loginDoctor(loginData).subscribe({
        next: (res) => {
          this.showAlert('Login successful! Redirecting...', 'success');
          console.log('Login successful:', res);
          localStorage.setItem('AuthToken', res.token);
          localStorage.setItem('doctorId', res.doctor.id);

          localStorage.setItem('doctorName', res.doctor.fullname);
          localStorage.setItem('loggedInDoctor', JSON.stringify(res.doctor));


          setTimeout(() => this.router.navigate(['/doctor']), 2000);
        },
        error: (err) => {
          let errorMsg = 'Something went wrong. Please try again later.';

          if (err.status === 0) {
            
            errorMsg = 'Cannot connect to the server. Please check your internet connection or try again later.';
          } else if (err.error?.message) {
            
            errorMsg = err.error.message;
          } else if (err.status === 401 || err.status === 400) {
            
            errorMsg = 'Invalid email or password.';
          }

          console.error('Error:', err);
          this.showAlert(errorMsg, 'danger');
        }

      });
    } else {
      this.showAlert('Please fill all the fields correctly', 'danger');
    }
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
