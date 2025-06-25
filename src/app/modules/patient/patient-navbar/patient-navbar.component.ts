import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './patient-navbar.component.html',
  styleUrl: './patient-navbar.component.css'
})
export class PatientNavbarComponent {
   showLogoutPopup = false;
  showLogoutAlert = false;

  constructor(private router: Router) {}

  confirmLogout(): void {
    this.showLogoutPopup = true;
  }

  logout(): void {
    this.showLogoutPopup = false;
    localStorage.clear();
   

    setTimeout(() => {
  
      this.router.navigate(['/']);
    }, 1500); 
  }

  cancelLogout(): void {
    this.showLogoutPopup = false;
  }
  
}
