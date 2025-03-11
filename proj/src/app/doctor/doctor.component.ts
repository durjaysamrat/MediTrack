import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service'; // ✅ Import the service

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // ✅ Store login error messages

  constructor(private fb: FormBuilder, private router: Router, private doctorService: DoctorService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // ✅ Change to email-based login
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this.doctorService.loginDoctor(email, password).subscribe(
      (response: any) => {
        alert('✅ Login Successful!');
        localStorage.setItem('doctor', JSON.stringify(response.doctor)); // ✅ Store doctor info in localStorage
        this.router.navigate(['/doctor-dashboard']); // ✅ Redirect to dashboard
      },
      (error) => {
        this.errorMessage = '❌ Invalid email or password!';
        console.error('Login Error:', error);
      }
    );
  }
}
