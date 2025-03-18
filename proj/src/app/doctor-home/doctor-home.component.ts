import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';


@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {

  doctorName: string = ''; 
  todayAvailability: string = 'Loading...';
  patients: any[] = [];  
  selectedPatient: any = null;  
  availabilityForm: FormGroup;
  currentTime: string = ''; 
  
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
    this.getDoctorNameFromLocalStorage()
    const today = new Date();
    
    
    // Get formatted date and day
    const dateString = today.toLocaleDateString(); // Gets date in mm/dd/yyyy format (depends on locale)
    const dayString = today.toLocaleString('en-us', { weekday: 'long' }); // Gets the full weekday name (e.g., "Monday")
    
    // Get current time in AM/PM format with hours and minutes only
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // This ensures AM/PM format
    };
    const timeString = today.toLocaleTimeString('en-US', timeOptions); // Get time in HH:MM AM/PM format
    
    // Format it as "Day, Date"
    this.todayAvailability = `${dayString}, ${dateString}`;
    this.currentTime = timeString; // Store formatted time (e.g., "09:45 AM")


  }

  loadPatients() {
    this.doctorService.getPatients().subscribe((data) => {
      this.patients = data;
      this.totalPatients = data.length;  
    });
  }

  loadDashboardData() {
    setTimeout(() => {
      this.nextAvailability = 'TUESDAY, 10:30 AM';
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

  getDoctorNameFromLocalStorage(): void {
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    console.log('Doctor from localStorage:', doctor);  // Debugging line
  
    if (doctor && doctor.firstName && doctor.lastName) {
      this.doctorName = `${doctor.firstName} ${doctor.lastName}`;  // Concatenate first and last name
    } else {
      console.error('❌ Doctor not logged in or no name found');
      alert('❌ Doctor not logged in!');
    }
  }

  getDoctorTodayAvailability() {
    const doctorId = 1;  // Replace with actual dynamic doctor ID if necessary
    this.doctorService.getAvailability(doctorId).subscribe(
      (availabilityData: any) => {
        // Assuming availabilityData contains a date and time range
        const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
        const todayAvailability = availabilityData.find((availability: any) => availability.date === today);
        if (todayAvailability) {
          this.todayAvailability = `${todayAvailability.availableFrom} - ${todayAvailability.availableTo}`;
        } else {
          this.todayAvailability = 'No availability for today';
        }
      },
      (error) => {
        console.error('❌ Error fetching availability:', error);
      }
    );
  }
  
}

