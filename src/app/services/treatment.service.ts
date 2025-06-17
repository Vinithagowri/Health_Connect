import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;
  getTreatmentByAppointmentId(appointmentId: number) {
    return this.http.get(`${this.baseUrl}Doctor/getTreatmentByAppointmentId/${appointmentId}`);
  }

  addTreatment(treatment: any) {
    return this.http.post(`${this.baseUrl}Doctor/insertTreatment`, treatment);
  }

  updateTreatment(treatment: any) {
    return this.http.put(`${this.baseUrl}Doctor/updateTreatment`, treatment);
  }
}
