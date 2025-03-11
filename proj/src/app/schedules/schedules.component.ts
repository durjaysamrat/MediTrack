import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  schedules: any[] = [];  // Store doctor schedules

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {
    this.doctorService.getSchedules().subscribe((data) => {
      this.schedules = data;
    });
  }
}
