import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { IUser } from '../types';

@Component({
  selector: 'app-users',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  private http = inject(HttpClient);
  users = signal<IUser[]>([]);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<IUser[]>('/api/users').subscribe(users => this.users.set(users));
  }

  onDelete(user: IUser) {
    this.http.delete(`/api/users/${user.name}`).subscribe(() => this.loadUsers());
  }

  onAdd(user: IUser) {
    console.log('add', user);
}
}