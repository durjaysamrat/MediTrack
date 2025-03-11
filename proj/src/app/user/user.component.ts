import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = new User();
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.fetchUsers();
      this.newUser = new User();
      this.isEditing = false;
    });
  }

  deleteUser(id?: number): void {
    if (id) {
      this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
    }
  }
}
