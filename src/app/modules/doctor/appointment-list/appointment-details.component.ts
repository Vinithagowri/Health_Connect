import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { AppointmentService } from '../../../services/appointment.service';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-appointment-details',
  imports: [CommonModule,DoctorNavbarComponent,AgGridAngular],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent  implements OnInit {
  doctorId: number = Number(localStorage.getItem("doctorId"));
  rowData: any[] = [];

  colDefs: ColDef[] = [
    { field: 'patientName', filter: true },
    {
      headerName: 'Date',
      field: 'appointmentDate',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
      filter: 'agDateColumnFilter'
    },
    {
      headerName: 'Time',
      field: 'appointmentDate',
      valueFormatter: (params) => new Date(params.value).toLocaleTimeString()
    },
    { field: 'reason', filter: true },
    { field: 'status', filter: true },
    {
      headerName: 'Update Status',
      cellRenderer: (params : any) => {
        const status = params.data.status;
        const disabled = status === 'Cancelled' || status === 'Completed';

        return `
          <select ${disabled ? 'disabled' : ''} data-id="${params.data.appointmentId}">
            <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        `;
      },
      onCellClicked: (event) => {
        const nativeEvent = event.event;
        if (nativeEvent && nativeEvent.target instanceof HTMLSelectElement) {
          const selectElement = nativeEvent as Event & { target: HTMLSelectElement };
          const status = selectElement.target.value;
          const id = +selectElement.target.dataset['id']!;
          this.updateStatus(id, status);
        }
      }
      
    }
  ];

  defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe(data => {
      this.rowData = data;
    });
  }

  updateStatus(id: number, status: string) {
    this.appointmentService.updateAppointmentStatus(id, status).subscribe(() => {
      this.loadAppointments(); // Reload after update
    });
  }

  onGridReady(params: GridReadyEvent) {
    // Optional: keep for future API access
  }
}
//   appointments: any[] = [];
//   doctorId: number = Number(localStorage.getItem("doctorId"));

//   constructor(private appointmentService: AppointmentService) {}

//   ngOnInit(): void {
//     this.loadAppointments();
//   }

//   loadAppointments() {
//     this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe(data => {
//       this.appointments = data;
//     });
//   }

//   updateStatus(id: number, status: string) {
//     this.appointmentService.updateAppointmentStatus(id, status).subscribe(() => {
//       this.loadAppointments();
//     });
//   }
// }
