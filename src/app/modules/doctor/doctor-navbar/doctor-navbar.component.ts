import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-navbar',
  imports: [],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css'
})
export class DoctorNavbarComponent {
  constructor(private router: Router) {}
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
