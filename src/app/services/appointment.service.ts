import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
// import { environment } from 'src/environments/environments';
// export interface Appointment {
//   patientId: number;
//   fullName: string;
//   age: number;
//   gender: string;
//   contact: string;
//   email?: string;
//   doctorId: number;
//   date: string;
//   time: string;
//   reason: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl;
  // private apiUrl = 'http://localhost:5270/api/Appointment';

  constructor(private http: HttpClient) {}

  getAppointmentsByDoctor(doctorId: number) {
    return this.http.get<any[]>(`${this.apiUrl}Appointment/getAppointmentsByDoctorId/${doctorId}`);
  }

  updateAppointmentStatus(appointmentId: number, status: string) {
    return this.http.put(`${this.apiUrl}Appointment/updateAppointmentStatus`, {
      appointmentId,
      status
    });
  }

  getCompletedAppointmentsByDoctor(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Appointment/getCompletedAppointmentsByDoctorId/${doctorId}`);
  }
  makeAppointment(appointment:any): Observable<any> {
    return this.http.post(`${this.apiUrl}Appointment/bookAppointment`, appointment);
  }
  getAppointmentsByPatientId(patientId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Appointment/getPatientAppointmentById/${patientId}`);

  }

}
