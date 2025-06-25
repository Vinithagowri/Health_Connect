import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Modal } from 'bootstrap';

@Component({
  selector: 'app-doctor-navbar',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css'
})
export class DoctorNavbarComponent {
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
    }, 500); 
  }

  cancelLogout(): void {
    this.showLogoutPopup = false;
  }
}
