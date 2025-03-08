import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHomePage: boolean = false; // Default: No header/footer

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Show header/footer ONLY on home page
        this.isHomePage = event.url === '/' || event.url === '/home';
      }
    });
  }
  isDoctorDashboard(): boolean {
    return this.router.url.includes('/doctor-dashboard');
  }
}
