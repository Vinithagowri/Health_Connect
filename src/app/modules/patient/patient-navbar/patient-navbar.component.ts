import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-navbar',
  imports: [],
  templateUrl: './patient-navbar.component.html',
  styleUrl: './patient-navbar.component.css'
})
export class PatientNavbarComponent {
  constructor(private router: Router) {}
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
