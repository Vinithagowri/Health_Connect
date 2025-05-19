import { Component } from '@angular/core';
import { AuthRoutingModule } from '../../modules/auth/auth-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [AuthRoutingModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
