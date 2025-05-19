import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface DoctorModel {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  // private apiUrl = 'http://localhost:5270/api/Auth'; 
  // /api/Auth/registerDoctor
  private apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) {}

  signupDoctor(doctor: DoctorModel): Observable<any> {
    return this.http.post(`${this.apiUrl}Auth/registerDoctor`, doctor);
  }

  loginDoctor(credentials: LoginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}Auth/loginDoctor`, credentials);
  }
}
