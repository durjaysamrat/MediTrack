import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  newUser: any = { username: '', name: '', email: '', age: null, contact: '', password: '' };
  editUser: any = null;
  selectedUser: any = null;
  deleteUserId: number | null = null;

  showAddUserModal: boolean = false;
  showEditUserModal: boolean = false;
  showViewUserModal: boolean = false;
  showDeleteUserModal: boolean = false;

  constructor(private userService: UserService) {}

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
        console.error('❌ Error fetching users:', error);
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
    this.newUser = { username: '', name: '', email: '', age: null, contact: '', password: '' }; // Reset input fields
    this.showAddUserModal = true;
  }

  // ✅ Add a new user
  addUser(): void {
    if (!this.newUser.username || !this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('⚠️ All fields are required!');
      return;
    }

    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('✅ User added successfully:', response);
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
    this.editUser = { ...user };
    this.showEditUserModal = true;
  }

  // ✅ Update user details
  updateUser(): void {
    if (!this.editUser.username || !this.editUser.name || !this.editUser.email) {
      alert('⚠️ All fields are required!');
      return;
    }

    this.userService.updateUser(this.editUser).subscribe(
      (response) => {
        console.log('✅ User updated successfully:', response);
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

  // ✅ Open "Delete User Confirmation" Modal
  openDeleteUserModal(userId: number): void {
    this.deleteUserId = userId;
    this.showDeleteUserModal = true;
  }

  // ✅ Delete user from system
  deleteUser(): void {
    if (this.deleteUserId === null) return;

    this.userService.deleteUser(this.deleteUserId).subscribe(
      () => {
        console.log(`✅ User with ID ${this.deleteUserId} deleted.`);
        this.loadUsers();
        this.deleteUserId = null;
        this.closeModal();
      },
      (error) => {
        console.error('❌ Error deleting user:', error);
        alert('⚠️ Failed to delete user.');
      }
    );
  }

  // ✅ Close any open modal
  closeModal(): void {
    this.selectedUser = null;
    this.editUser = null;
    this.deleteUserId = null;
    this.showAddUserModal = false;
    this.showEditUserModal = false;
    this.showViewUserModal = false;
    this.showDeleteUserModal = false;
  }
}
