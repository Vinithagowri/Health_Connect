import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class DoctorProfileService {
  
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  
  getProfile(doctorId: number) {
    return this.http.get(`${this.apiUrl}Doctor/getDoctorProfileById/${doctorId}`);
  }

  createProfile(profile: any) {
    return this.http.post(`${this.apiUrl}Doctor/registerProfile`, profile);
  }

  updateProfile(profile: any) {
    return this.http.put(`${this.apiUrl}Doctor/updateDoctorProfile`, profile);
  }
  availableDoctors() {
    return this.http.get<any[]>(`${this.apiUrl}Doctor/getAvailableDoctors`);
  }
}
