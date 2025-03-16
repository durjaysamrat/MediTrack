import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/deskuser.service';

@Component({
  selector: 'app-deskusers',
  templateUrl: './deskusers.component.html',
  styleUrls: ['./deskusers.component.css']
})
export class DeskusersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  addUserForm!: FormGroup;
  editUserForm!: FormGroup;
  selectedUser: any = null;
  userToDelete: any = null;

  showViewUserModal: boolean = false;
  showAddUserModal: boolean = false;
  showEditUserModal: boolean = false;
  showDeleteUserModal: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initializeForms();
  }

  // ✅ Initialize Forms with Validation
  initializeForms(): void {
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.editUserForm = this.fb.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ✅ Fetch all users from backend
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // ✅ Search users dynamically
  searchUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // ✅ Open "Add User" Modal
  openAddUserModal(): void {
    this.addUserForm.reset();
    this.showAddUserModal = true;
  }

  // ✅ Add a new user
  addUser(): void {
    if (this.addUserForm.invalid) {
      alert('⚠️ Please fill all fields correctly!');
      return;
    }

    this.userService.addUser(this.addUserForm.value).subscribe(
      () => {
        console.log('✅ User added successfully');
        this.loadUsers();
        this.closeModal();
      },
      (error) => {
        console.error('❌ Error adding user:', error);
        alert('⚠️ Failed to add user.');
      }
    );
  }

  // ✅ Open "Edit User" Modal
  openEditUserModal(user: any): void {
    this.editUserForm.patchValue(user);
    this.showEditUserModal = true;
  }

  // ✅ Update User
  updateUser(): void {
    if (this.editUserForm.invalid) {
      alert('⚠️ Please fill all fields correctly!');
      return;
    }

    this.userService.updateUser(this.editUserForm.value).subscribe(
      () => {
        console.log('✅ User updated successfully');
        this.loadUsers();
        this.closeModal();
      },
      (error) => {
        console.error('❌ Error updating user:', error);
        this.editUserForm.markAllAsTouched();
        alert('⚠️ Failed to update user.');
      }
    );
  }

  // ✅ Open "View User" Modal
  viewUser(user: any): void {
    this.selectedUser = user;
    this.showViewUserModal = true;
  }

  // ✅ Open "Delete User" Confirmation Modal
  openDeleteUserModal(user: any): void {
    this.userToDelete = user;
    this.showDeleteUserModal = true;
  }

  // ✅ Delete user
  deleteUser(): void {
    if (!this.userToDelete?.id) {
      alert('⚠️ Failed to delete user. No user ID found.');
      return;
    }

    this.userService.deleteUser(this.userToDelete.id).subscribe(
      () => {
        console.log(`✅ User with ID ${this.userToDelete.id} deleted successfully.`);
        this.loadUsers();
        this.closeModal();
      },
      (error) => {
        console.error('❌ Error deleting user:', error);
        alert('⚠️ Failed to delete user. Please try again.');
      }
    );
  }

  // ✅ Close any open modal
  closeModal(): void {
    this.showViewUserModal = false;
    this.showAddUserModal = false;
    this.showEditUserModal = false;
    this.showDeleteUserModal = false;
    this.selectedUser = null;
    this.userToDelete = null;
  }
}
