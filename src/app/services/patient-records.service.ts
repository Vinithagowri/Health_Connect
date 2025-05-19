import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

// const BASE_URL = 'http://localhost:5270/api/PatientRecords'; // Adjust port accordingly

@Injectable({
  providedIn: 'root'
})
export class PatientRecordsService {

  constructor(private http: HttpClient) {}

  private apiUrl= environment.apiUrl;
  getBasicDetails(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}PatientRecords/getBasicDetailsByPatientId/${patientId}`);
  }

  createBasicDetails(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/createBasicDetails`, data);
  }

  updateBasicDetails(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}PatientRecords/updateBasicDetails`, data);
  }

  
  addLabReport(report: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/Postlabreport`, report);
  }

  getLabReports(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}PatientRecords/getLabreportsByPatientId/${patientId}`);
  }

  addOrUpdateMedicalHistory(history: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/addMedicalHistory`, history);
  }

  getMedicalHistory(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}PatientRecords/getMedicalHistoryByPatientId/${patientId}`);
  }

 
  addMedication(medication: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/addMedication`, medication);
  }

  getMedications(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}PatientRecords/getMedicationsByPatientId/${patientId}`);
  }


  addHospitalization(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/addHospitalizationRecord`, data);
  }

  getHospitalizations(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}PatientRecords/getHospitalizationsRecordsByPatientId/${patientId}`);
  }
}
