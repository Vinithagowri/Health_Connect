import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctorsignup',
  imports: [ReactiveFormsModule,],
  templateUrl: './doctorsignup.component.html',
  styleUrl: './doctorsignup.component.css'
})
export class DoctorsignupComponent {
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
