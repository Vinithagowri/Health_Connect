import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService, LoginModel } from '../../../services/doctor.service'; // Adjust path accordingly
import { NavbarComponent } from '../../../pages/navbar/navbar.component';

@Component({
  selector: 'app-doctorlogin',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, FormsModule],
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
    private doctorService: DoctorService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

      this.doctorService.loginDoctor(loginData).subscribe({
        next: (res) => {
          this.showAlert('Login successful! Redirecting...', 'success');
          localStorage.setItem('doctorId', res.id); 
           
          localStorage.setItem('doctorName', res.fullName); 
          localStorage.setItem('loggedInDoctor', JSON.stringify(res)); 
          console.log(localStorage.getItem('doctorId')); 
          console.log(res);
          
          setTimeout(() => this.router.navigate(['/doctor']), 2000);
        },
        error: () => {
          this.showAlert('Invalid email or password. Please try again.', 'danger');
        }
      });
    } else {
      this.showAlert('Please enter valid credentials.', 'danger');
    }
  }
}
