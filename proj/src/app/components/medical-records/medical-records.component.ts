import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
  medicalRecords: any[] = []; // Stores medical records locally
  searchQuery: string = ''; // Search input

  newRecord = {
    patientId: '',
    patientName: '',
    diagnosis: '',
    treatment: '',
    testResults: ''
  };

  // ✅ Adds a new medical record
  addMedicalRecord() {
    if (!this.newRecord.patientId || !this.newRecord.patientName) {
      alert('Patient ID and Name are required.');
      return;
    }

    this.medicalRecords.push({ ...this.newRecord });

    // Reset form after submission
    this.resetForm();
  }

  // ✅ Filters records by Patient ID or Name
  filteredRecords() {
    return this.medicalRecords.filter(record =>
      record.patientId.toString().includes(this.searchQuery) ||
      record.patientName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  resetForm() {
    this.newRecord = {
      patientId: '',
      patientName: '',
      diagnosis: '',
      treatment: '',
      testResults: ''
    };
  }
}
