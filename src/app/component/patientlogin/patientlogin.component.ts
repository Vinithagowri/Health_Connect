import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-patientlogin',
  imports: [ReactiveFormsModule],
  templateUrl: './patientlogin.component.html',
  styleUrl: './patientlogin.component.css'
})
export class PatientloginComponent {
form!: any; // Declare the form variable

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }
  onSubmit(){
    console.log(this.form.value);
  }
}
