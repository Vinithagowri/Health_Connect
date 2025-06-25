import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
constructor(private http: HttpClient) {}
   private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('AuthToken');
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  baseUrl = environment.apiUrl;
  getTreatmentByAppointmentId(appointmentId: number) {
    return this.http.get(`${this.baseUrl}Doctor/getTreatmentByAppointmentId/${appointmentId}`,{
      headers: this.getAuthHeaders()
    });
  }

  addTreatment(treatment: any) {
    return this.http.post(`${this.baseUrl}Doctor/insertTreatment`, treatment, {
      headers: this.getAuthHeaders()
    });
  }

  updateTreatment(treatment: any) {
    return this.http.put(`${this.baseUrl}Doctor/updateTreatment`, treatment, {
      headers: this.getAuthHeaders()
    });
  }
}
