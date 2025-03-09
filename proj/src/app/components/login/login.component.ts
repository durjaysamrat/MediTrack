import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  
    constructor(private fb: FormBuilder, private router: Router) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  
    login() {
      const { username, password } = this.loginForm.value;
      
      if (username === 'desk' && password === 'password123') {
        alert('Login Successful!');
        this.router.navigate(['/front-desk']); // Navigate to dashboard
      } else {
        alert('Invalid Credentials');
      }
    }

}
