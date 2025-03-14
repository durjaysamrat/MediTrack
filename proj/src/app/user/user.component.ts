import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  addUserForm!: FormGroup;
  editUserForm!: FormGroup;
  newUser: any = { username: '', name: '', email: '', age: null, contact: '', password: '' };
  editUser: any = null;
  selectedUser: any = null;
  userToDelete: any = null; // Updated to store the user object

  showViewUserModal: boolean = false;
  showAddUserModal: boolean = false;
  showEditUserModal: boolean = false;
  showDeleteUserModal: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
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
    this.newUser = { username: '', name: '', email: '', age: null, contact: '', password: '' };
    this.showAddUserModal = true;
  }

  // ✅ Add a new user
  addUser(): void {
    if (!this.newUser.username || !this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('⚠️ All fields are required!');
      return;
    }

    this.userService.addUser(this.newUser).subscribe(
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
    this.editUser = { ...user }; // Clone user object
    this.showEditUserModal = true;
  }

  // ✅ Update User
  updateUser(): void {
    if (!this.editUser || !this.editUser.username || !this.editUser.name || !this.editUser.email) {
      alert('⚠️ All fields are required!');
      return;
    }

    this.userService.updateUser(this.editUser).subscribe(
      () => {
        console.log('✅ User updated successfully');
        this.loadUsers();
        this.closeModal();
      },
      (error) => {
        console.error('❌ Error updating user:', error);
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
    this.userToDelete = user; // Store full user object
    this.showDeleteUserModal = true;
  }

  // ✅ Delete user
  deleteUser(): void {
    if (!this.userToDelete || !this.userToDelete.id) {
      console.error('❌ Error: No user ID provided for deletion.');
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
    this.editUser = null;
    this.userToDelete = null;
  }
}
