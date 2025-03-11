import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];  
  newUser = { 
    id: null,  // ✅ Fix: Ensure ID is null for new users
    username: '', 
    name: '', 
    email: '', 
    password: '', 
    role: 'USER' 
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        console.log('✅ Fetched Users:', users);
        this.users = users;
      },
      (error) => console.error('❌ Error fetching users:', error)
    );
  }

  addUser(): void {
    console.log('🔹 Adding User:', this.newUser);
    
    if (this.newUser.id === 0) {
      this.newUser.id = null; 
    }

    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('✅ User Added Successfully:', response);
        this.fetchUsers();
        this.resetForm();
      },
      (error) => console.error('❌ Error adding user:', error)
    );
  }

  deleteUser(id?: number): void {
    if (id) {
      console.log('🗑️ Deleting User ID:', id);
      this.userService.deleteUser(id).subscribe(
        () => this.fetchUsers(),
        (error) => console.error('❌ Error deleting user:', error)
      );
    }
  }

  resetForm(): void {
    this.newUser = { id: null, username: '', name: '', email: '', password: '', role: 'USER' }; // ✅ Reset form fields
  }
}
