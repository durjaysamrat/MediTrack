import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MedicalRecord {
  id: number;
  name: string;
  age: number;
  history: string;
}

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  records: MedicalRecord[] = [];
  filteredRecords: MedicalRecord[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMedicalRecords();
  }

  fetchMedicalRecords(): void {
    this.http.get<MedicalRecord[]>('http://localhost:8081/api/patients')
      .subscribe(data => {
        this.records = data.map(patient => ({
          id: patient.id,
          name: patient.name,  // ✅ Adjusting for backend field names
          age: patient.age,
          history: patient.history || 'No history available'
        }));
        this.filteredRecords = [...this.records]; // Initialize filtered list
      }, error => {
        console.error('Error fetching medical records:', error);
      });
  }

  onSearch(): void {
    this.filteredRecords = this.records.filter((record) =>
      record.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateRecord(recordId: number): void {
    const updatedMedicalHistory = prompt('Enter new medical history:');
    if (updatedMedicalHistory) {
      // Update the record locally
      this.records = this.records.map(record =>
        record.id === recordId ? { ...record, history: updatedMedicalHistory } : record
      );
      this.filteredRecords = [...this.records];

    
      this.http.put(`http://localhost:8081/api/patients/${recordId}/updateHistory`, 
        { history: updatedMedicalHistory })
        .subscribe(() => console.log('Medical history updated!'), 
        error => console.error('Error updating medical history:', error));
    }
  }
}
