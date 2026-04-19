import { HttpClient } from '@angular/common/http';
import { Component , inject,  input,  signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { IUser } from '../types';

interface User {
  name: string;
  id: number;
}

@Component({
  selector: 'app-users',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private http = inject(HttpClient);
  users = input<IUser[]>();

  onAdd(app: IUser) {
    console.log('add', app);
  }

  onDelete(app: IUser) {
    console.log('delete', app);
  }
}
