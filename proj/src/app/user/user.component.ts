// src/app/admin/user-management/user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '', role: '' };
  roles: string[] = ['admin', 'doctor', 'staff', 'user'];
  isEditing: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
    });
  }

  addUser() {
    this.http.post('http://localhost:3000/users', this.newUser).subscribe(() => {
      this.fetchUsers();
      this.newUser = { id: 0, name: '', email: '', role: '' };
    });
  }

  editUser(user: User) {
    this.newUser = { ...user };
    this.isEditing = true;
  }

  updateUser() {
    this.http.put(`http://localhost:3000/users/${this.newUser.id}`, this.newUser).subscribe(() => {
      this.fetchUsers();
      this.newUser = { id: 0, name: '', email: '', role: '' };
      this.isEditing = false;
    });
  }

  deleteUser(id: number) {
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}