import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreatmentService } from '../../../services/treatment.service';

@Component({
  selector: 'app-patient-records',
  imports: [DoctorNavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-records.component.html',
  styleUrl: './patient-records.component.css'
}) export class PatientRecordsComponent implements OnInit {
  patientRecords: any[] = [];
  filteredRecords: any[] = [];
  doctorId: number = Number(localStorage.getItem("doctorId"));
  isNewTreatment: boolean = true;
  searchTerm: string = '';
  fromDate: string = '';
  toDate: string = '';

  showTreatmentModal: boolean = false;
  selectedRecord: any = null;
  isUpdateMode: boolean = false;
  treatmentDetails: any = {
    treatmentId: 0,
    appointmentId: 0,
    treatmentProvided: "",
    prescription: "",
    notes: "",
    treatmentDate: ""
  };

  constructor(private appointmentService: AppointmentService,
    private treatmentService: TreatmentService) { }

  ngOnInit(): void {
    this.loadPatientRecords();
  }

  loadPatientRecords() {
    this.appointmentService.getCompletedAppointmentsByDoctor(this.doctorId)
      .subscribe(data => {

        this.patientRecords = data.map(r => ({ ...r }));
        this.filteredRecords = [...this.patientRecords];
        console.log(this.patientRecords);
      });
  }

  filterRecords() {
    this.filteredRecords = this.patientRecords.filter(record => {
      const matchesName = this.searchTerm
        ? record.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const appointmentDate = new Date(record.appointmentDate);
      const matchesFrom = this.fromDate ? appointmentDate >= new Date(this.fromDate) : true;
      const matchesTo = this.toDate ? appointmentDate <= new Date(this.toDate) : true;

      return matchesName && matchesFrom && matchesTo;
    });
    this.filteredRecords.forEach(record => {
      record.loadingTreatment = true;
      this.treatmentService.getTreatmentByAppointmentId(record.appointmentId)
        .subscribe(data => {
          record.hasTreatment =true;
          record.loadingTreatment = false;
        }, error => {
          console.error(`Error fetching treatment for appointment ${record.appointmentId}:`, error);
          record.hasTreatment = false;
          record.loadingTreatment = false;
        });
    });

  }

  clearFilters() {
    this.searchTerm = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredRecords = [...this.patientRecords];
  }

  openTreatmentModal(record: any, isUpdate: boolean) {
    this.selectedRecord = record;
    this.isUpdateMode = isUpdate;



    this.treatmentService.getTreatmentByAppointmentId(record.appointmentId)
      .subscribe(data => {
        this.treatmentDetails = data;
        this.showTreatmentModal = true;
        this.isNewTreatment = false
      },
        error => {
          this.isNewTreatment = true;
        });
    if (this.isNewTreatment) {
      // initialize empty form for new treatment
      this.treatmentDetails = {
        treatmentProvided: "",
        prescription: "",
        notes: "",
        treatmentDate: ""
      };
      this.showTreatmentModal = true;
    }
  }

  saveTreatment() {
    if(!this.isNewTreatment){
      this.isUpdateMode=true;
    }
    if (this.isUpdateMode) {

      this.treatmentService.updateTreatment(this.treatmentDetails)
        .subscribe(() => {
          alert('Treatment updated successfully!');
          this.showTreatmentModal = false;
          this.loadPatientRecords();
        });
    } else {
      const newTreatment = {
        appointmentId: this.selectedRecord.appointmentId,
        treatmentProvided: this.treatmentDetails.treatmentProvided,
        prescription: this.treatmentDetails.prescription,
        notes: this.treatmentDetails.notes,
        treatmentDate: this.treatmentDetails.treatmentDate
      };
      console.log(newTreatment);
      this.treatmentService.addTreatment(newTreatment)
        .subscribe(() => {
          alert('Treatment added successfully!');
          this.showTreatmentModal = false;
          this.loadPatientRecords();
        });
    }
  }

  closeModal() {
    this.showTreatmentModal = false;
    this.selectedRecord = null;
    this.treatmentDetails = { description: '' };
  }
}