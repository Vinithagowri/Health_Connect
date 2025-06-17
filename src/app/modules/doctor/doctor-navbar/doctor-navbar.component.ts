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
  constructor(private router: Router) {}
  
  logout(){
    const modalElement = document.getElementById('logoutModal');
  
  if (modalElement) {
    
    const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();
  }
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
