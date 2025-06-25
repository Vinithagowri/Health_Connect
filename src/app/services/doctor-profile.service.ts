import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class DoctorProfileService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('AuthToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProfile(doctorId: number) {
    return this.http.get(`${this.apiUrl}Doctor/getDoctorProfileById/${doctorId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createProfile(profile: any) {
    return this.http.post(`${this.apiUrl}Doctor/registerProfile`, profile, {
      headers: this.getAuthHeaders()
    });
  }

  updateProfile(profile: any) {
    return this.http.put(`${this.apiUrl}Doctor/updateDoctorProfile`, profile, {
      headers: this.getAuthHeaders()
    });
  }

  availableDoctors() {
    return this.http.get<any[]>(`${this.apiUrl}Doctor/getAvailableDoctors`, {
      headers: this.getAuthHeaders()
    });
  }
}
