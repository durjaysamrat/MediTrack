import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports: any[] = [];
  reportForm: FormGroup;
  editingReport: any = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      id: [null],
      title: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.http.get<any[]>('/api/reports').subscribe(data => {
      this.reports = data;
    });
  }

  submitReport() {
    if (this.editingReport) {
      this.http.post('/api/reports', this.reportForm.value).subscribe(() => {
        this.getReports();
        this.reportForm.reset();
        this.editingReport = null;
      });
    } else {
      this.http.post('/api/reports', this.reportForm.value).subscribe(() => {
        this.getReports();
        this.reportForm.reset();
      });
    }
  }

  editReport(report: any) {
    this.editingReport = report;
    this.reportForm.setValue({
      id: report.id,
      title: report.title,
      content: report.content
    });
  }

  deleteReport(id: number) {
    this.http.delete(`/api/reports/${id}`).subscribe(() => {
      this.getReports();
    });
  }
}
