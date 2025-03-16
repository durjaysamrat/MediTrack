import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorUserService } from '../services/doctoruser.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-users',
  templateUrl: './doctorusers.component.html',
  styleUrls: ['./doctorusers.component.css']
})
export class DoctorUsersComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  searchTerm: string = '';

  addDoctorForm!: FormGroup;
  editDoctorForm!: FormGroup;
  selectedDoctor: any = null;
  doctorToDelete: any = null;

  showViewDoctorModal: boolean = false;
  showAddDoctorModal: boolean = false;
  showEditDoctorModal: boolean = false;
  showDeleteDoctorModal: boolean = false;

  constructor(private DoctorUserService: DoctorUserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.initializeForms();
  }

  initializeForms(): void {
    this.addDoctorForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      specialization: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.editDoctorForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      specialization: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loadDoctors(): void {
    this.DoctorUserService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
        this.filteredDoctors = [...this.doctors];
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  searchDoctors(): void {
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddDoctorModal(): void {
    this.addDoctorForm.reset();
    this.showAddDoctorModal = true;
  }

  addDoctor(): void {
    if (this.addDoctorForm.invalid) {
      alert('Please fill all fields correctly!');
      return;
    }
    this.DoctorUserService.addDoctor(this.addDoctorForm.value).subscribe(
      () => {
        this.loadDoctors();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding doctor:', error);
        alert('Failed to add doctor.');
      }
    );
  }

  openEditDoctorModal(doctor: any): void {
    this.editDoctorForm.patchValue(doctor);
    this.showEditDoctorModal = true;
  }

  updateDoctor(): void {
    if (this.editDoctorForm.invalid) {
      alert('Please fill all fields correctly!');
      return;
    }
    this.DoctorUserService.updateDoctor(this.editDoctorForm.value).subscribe(
      () => {
        this.loadDoctors();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating doctor:', error);
        alert('Failed to update doctor.');
      }
    );
  }

  viewDoctor(doctor: any): void {
    this.selectedDoctor = doctor;
    this.showViewDoctorModal = true;
  }

  openDeleteDoctorModal(doctor: any): void {
    this.doctorToDelete = doctor;
    this.showDeleteDoctorModal = true;
  }

  deleteDoctor(): void {
    if (!this.doctorToDelete?.id) {
      alert('Failed to delete doctor. No doctor ID found.');
      return;
    }
    this.DoctorUserService.deleteDoctor(this.doctorToDelete.id).subscribe(
      () => {
        this.loadDoctors();
        this.closeModal();
      },
      (error) => {
        console.error('Error deleting doctor:', error);
        alert('Failed to delete doctor. Please try again.');
      }
    );
  }

  closeModal(): void {
    this.showViewDoctorModal = false;
    this.showAddDoctorModal = false;
    this.showEditDoctorModal = false;
    this.showDeleteDoctorModal = false;
    this.selectedDoctor = null;
    this.doctorToDelete = null;
  }
}
