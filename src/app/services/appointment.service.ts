import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
   private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('AuthToken');
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  getAppointmentsByDoctor(doctorId: number) {
    return this.http.get<any[]>(`${this.apiUrl}Appointment/getAppointmentsByDoctorId/${doctorId}`,{
      headers: this.getAuthHeaders()
    });
  }

  updateAppointmentStatus(appointmentId: number, status: string) {
    return this.http.put(`${this.apiUrl}Appointment/updateAppointmentStatus`, {
      appointmentId,
      status
    },{
      headers: this.getAuthHeaders()
    });
  }

  getCompletedAppointmentsByDoctor(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Appointment/getCompletedAppointmentsByDoctorId/${doctorId}`,{
      headers: this.getAuthHeaders()
    });
  }
  makeAppointment(appointment:any): Observable<any> {
    return this.http.post(`${this.apiUrl}Appointment/bookAppointment`, appointment,{
      headers: this.getAuthHeaders()
    });
  }
  getAppointmentsByPatientId(patientId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Appointment/getPatientAppointmentById/${patientId}`,{
      headers: this.getAuthHeaders()
    });

  }

}
