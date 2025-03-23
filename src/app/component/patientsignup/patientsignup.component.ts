import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patientsignup',
  imports: [ReactiveFormsModule],
  templateUrl: './patientsignup.component.html',
  styleUrl: './patientsignup.component.css'
})
export class PatientsignupComponent implements OnInit {
  form!: any; // Declare the form variable

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }
  onSubmit(){
    console.log(this.form.value);
  }
}
