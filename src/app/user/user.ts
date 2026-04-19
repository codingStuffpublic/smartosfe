import { Component, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserDialog } from '../user-dialog/user-dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../types';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, RouterLink, MatIconModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  protected readonly title = signal('smartosfe');
  router = inject(Router);
  dialog = inject(MatDialog);
  user = input<IUser>();

  private http = inject(HttpClient);


simulate() {
    this.http.post('/api/simulation/load', null, { responseType: 'text' }).subscribe();
}
  onLogout() {
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  
  }

  addUser() {
    this.dialog.open(UserDialog);
  }
  
}
