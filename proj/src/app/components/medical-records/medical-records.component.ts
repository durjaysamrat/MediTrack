import { Component, OnInit } from '@angular/core';

interface MedicalRecord {
  id: number;
  patientName: string;
  age: number;
  medicalHistory: string;
}

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  records: MedicalRecord[] = [
    { id: 1, patientName: 'John Doe', age: 45, medicalHistory: 'Hypertension, Diabetes' },
    { id: 2, patientName: 'Jane Smith', age: 34, medicalHistory: 'Asthma' },
    { id: 3, patientName: 'Emily White', age: 55, medicalHistory: 'Arthritis' },
    { id: 4, patientName: 'Michael Brown', age: 60, medicalHistory: 'Heart Disease' },
  ];
  filteredRecords: MedicalRecord[] = [...this.records];
  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.filteredRecords = this.records.filter((record) =>
      record.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateRecord(recordId: number): void {
    const updatedMedicalHistory = prompt('Enter new medical history:');
    if (updatedMedicalHistory) {
      // Update the record locally (you would typically call an API here)
      const updatedRecords = this.records.map(record => {
        if (record.id === recordId) {
          return { ...record, medicalHistory: updatedMedicalHistory };
        }
        return record;
      });

      // Reassign the records and filtered list
      this.records = updatedRecords;
      this.filteredRecords = updatedRecords;
    }
  }
}

