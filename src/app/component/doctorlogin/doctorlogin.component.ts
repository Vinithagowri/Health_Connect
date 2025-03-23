import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-doctorlogin',
  imports: [ReactiveFormsModule],
  templateUrl: './doctorlogin.component.html',
  styleUrl: './doctorlogin.component.css'
})
export class DoctorloginComponent {
  form!: any; // Declare the form variable
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  onSubmit(){
    console.log(this.form.value);
  }
}
