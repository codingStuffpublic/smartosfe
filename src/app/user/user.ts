import { Component, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDialog } from '../user-dialog/user-dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { IUser } from '../types';

@Component({
  selector: 'app-user',
  imports: [MatToolbarModule, MatButtonModule, JsonPipe],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
    protected readonly title = signal('smartosfe');
  router = inject(Router);
  dialog = inject(MatDialog);
  user = input<IUser>();

    onLogout() {
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  
  }

  addUser() {
    this.dialog.open(UserDialog);
  }
}
