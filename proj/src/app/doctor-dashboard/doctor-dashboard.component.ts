import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  patients: any[] = [];  
  selectedPatient: any = null;  
  availabilityForm: FormGroup;
  
  totalPatients: number = 0;  
  nextAvailability: string = 'Loading...';  
  hasChildRoute: boolean = false;  // Flag to check if a child route is active

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.availabilityForm = this.fb.group({
      availableFrom: [''],
      availableTo: ['']
    });

    // Listen for route changes to determine if a child route is active
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hasChildRoute = this.route.firstChild !== null;
      }
    });
  }

  ngOnInit(): void {
    this.loadPatients();  
    this.loadDashboardData();  
  }

  loadPatients() {
    this.doctorService.getPatients().subscribe((data) => {
      this.patients = data;
      this.totalPatients = data.length;  
    });
  }

  loadDashboardData() {
    setTimeout(() => {
      this.nextAvailability = 'Monday, 10:00 AM';
    }, 1000);  
  }

  updateAvailability() {
    const availability = this.availabilityForm.value;
  const doctorId = 1; // Replace with actual doctor ID if dynamic

  this.doctorService.updateAvailability(doctorId, availability).subscribe(() => {
    alert('Availability updated successfully!');
    this.nextAvailability = `${availability.availableFrom} - ${availability.availableTo}`;
  });
  }

  viewPatient(patient: any) {
    this.selectedPatient = patient;  
  }
}
