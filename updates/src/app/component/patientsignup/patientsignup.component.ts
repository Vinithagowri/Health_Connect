import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patientsignup',
  imports: [CommonModule,FormsModule,BrowserModule, ReactiveFormsModule, HttpClientModule],
 
  templateUrl: './patientsignup.component.html',
  styleUrl: './patientsignup.component.css'
})
export class PatientsignupComponent {
  signupForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    const { name, email, password, confirmPassword } = this.signupForm.value;

    // Ensure passwords match
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Prepare data to send
    const userData = { name, email, password };

    this.http.post('http://localhost:5000/signup', userData).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.signupForm.reset();
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }
}
