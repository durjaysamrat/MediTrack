// src/app/admin/reports/reports.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Report {
  date: string;
  appointments: number;
  revenue: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports() {
    this.http.get<Report[]>('http://localhost:3000/reports').subscribe(data => {
      this.reports = data;
    });
  }

  exportReport() {
    alert('Exporting report...');
  }
}
