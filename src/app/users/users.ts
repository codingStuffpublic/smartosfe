import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { IUser } from '../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [MatListModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  private http = inject(HttpClient);
  users = signal<IUser[]>([]);
  editingName: string | null = null;
  editingValue = '';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<IUser[]>('/api/users').subscribe(users => this.users.set(users));
  }

  onDelete(user: IUser) {
    this.http.delete(`/api/users/${user.name}`).subscribe(() => this.loadUsers());
  }

 startEdit(user: IUser) {
    this.editingName = user.name;
    this.editingValue = user.name;
  }

 saveEdit(user: IUser) {
  this.http.put(`/api/users/${user.name}`, null, {
    params: { newName: this.editingValue }
  }).subscribe(() => {
    this.editingName = null;
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser === user.name) {
      localStorage.setItem('username', this.editingValue);
    }
    this.loadUsers();
  });

}
}