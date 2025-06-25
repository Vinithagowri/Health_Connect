import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class PatientRecordsService {
constructor(private http: HttpClient) {}
   private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('AuthToken');
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  private apiUrl= environment.apiUrl;
  getBasicDetails(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}PatientRecords/getBasicDetailsByPatientId/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createBasicDetails(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/createBasicDetails`, data, {
      headers: this.getAuthHeaders()
    });
  }

  updateBasicDetails(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}PatientRecords/updateBasicDetails`, data, {
      headers: this.getAuthHeaders()
    });
  }

  
  addLabReport(report: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/Postlabreport`, report, {
      headers: this.getAuthHeaders()
    });
  }

  getLabReports(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}PatientRecords/getLabreportsByPatientId/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }
  deleteLabReport(ReportId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}PatientRecords/deleteLabReportById/${ReportId}`, {
      headers: this.getAuthHeaders()
    });
  }
  downloadLabReport(reportId: number): Observable<Blob> {
  return this.http.get(`${this.apiUrl}PatientRecords/downloadLabReportById/${reportId}`, {
    responseType: 'blob',
    headers: this.getAuthHeaders()
  });
}

  addOrUpdateMedicalHistory(history: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/addMedicalHistory`, history, {
      headers: this.getAuthHeaders()
    });
  }

  getMedicalHistory(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}PatientRecords/getMedicalHistoryByPatientId/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }

 
  addMedication(medication: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/addMedication`, medication, {
      headers: this.getAuthHeaders()
    });
  }

  getMedications(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}PatientRecords/getMedicationsByPatientId/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteMedication(MedicationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}PatientRecords/deleteMedicationbyId/${MedicationId}`, {
      headers: this.getAuthHeaders()
    });
  }
  addHospitalization(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}PatientRecords/addHospitalizationRecord`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getHospitalizations(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}PatientRecords/getHospitalizationsRecordsByPatientId/${patientId}`, {
      headers: this.getAuthHeaders()
    });
  }
  deleteHospitalization(hospitalizationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}PatientRecords/deleteHospitalizationbyId/${hospitalizationId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
