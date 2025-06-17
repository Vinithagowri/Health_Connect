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
export interface PatientModel {
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


export class AuthService {

 private apiUrl=environment.apiUrl;
   constructor(private http: HttpClient) {}
 
   signupDoctor(doctor: DoctorModel): Observable<any> {
     return this.http.post(`${this.apiUrl}Auth/registerDoctor`, doctor);
   }
 
   loginDoctor(credentials: LoginModel): Observable<any> {
     return this.http.post(`${this.apiUrl}Auth/loginDoctor`, credentials);
   }
    signupPatient(patient: PatientModel): Observable<any> {
       return this.http.post(`${this.apiUrl}Auth/registerPatient`, patient);
     }
   
     loginPatient(loginData: LoginModel): Observable<any> {
       return this.http.post(`${this.apiUrl}Auth/loginPatient`, loginData);
     }
}
