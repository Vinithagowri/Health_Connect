import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api="http://localhost:3000/api/auth"
  constructor() {
    
   }
  
}
