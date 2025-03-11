import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  private apiUrl = 'http://localhost:8081/admin-login/login'; // ✅ Fixed API URL
  errorMessage: string = ''; // ✅ Store error message
  successMessage: string = ''; // ✅ Store success message

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.errorMessage = ''; // Clear previous errors
    this.successMessage = ''; // Clear previous success messages

    const credentials = this.loginForm.value;

    this.http.post<{ success: boolean, role: string, message: string }>(this.apiUrl, credentials)
      .subscribe(response => {
        if (response.success) {
          this.successMessage = 'Login Successful!';
          
          // Navigate based on role
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'DOCTOR') {
            this.router.navigate(['/doctor']);
          } else {
            this.router.navigate(['/user']);
          }
        } else {
          this.errorMessage = 'Invalid Credentials';
        }
      }, error => {
        this.errorMessage = 'Error connecting to server';
        console.error('Server Error:', error);
      });
  }
}
