import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService, DoctorModel } from '../../../services/auth.service';


@Component({
  selector: 'app-doctorsignup',

  imports: [ReactiveFormsModule, NavbarComponent,RouterModule, CommonModule, FormsModule,HttpClientModule],
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
    private AuthService: AuthService
  ) {
    this.form = this.fb.group({
      fullName: ['',[Validators.required]],
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

      const doctorData: DoctorModel = { fullName, email, password };

      this.AuthService.signupDoctor(doctorData).subscribe({
        next: (res) => {
          this.showAlert('Signup successful! Redirecting to dashboard...', 'success');
          localStorage.setItem('AuthToken', res.token);
          localStorage.setItem('doctorId', res.doctor.id);

          localStorage.setItem('doctorName', res.doctor.fullname);
          localStorage.setItem('loggedInDoctor', JSON.stringify(res.doctor));

         
          setTimeout(() => this.router.navigate(['/doctor']), 2000);
        },
        error: (err) => {
          const errorMsg ='Signup failed. Try again.';
        
          this.showAlert(errorMsg, 'danger');
        }
      });
    } else {
      this.showAlert('Please fill all required fields correctly.', 'danger');
    }
  }
  get passwordMismatch(): boolean {
  const { password, confirmPassword } = this.form.value;
  return password && confirmPassword && password !== confirmPassword;
}

}
