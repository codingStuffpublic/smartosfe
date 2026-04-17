import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Users } from './users/users';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDialog } from './user-dialog/user-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Users, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('smartosfe');
  router = inject(Router);
  dialog = inject(MatDialog);


  onLogout() {
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  addUser() {
    this.dialog.open(UserDialog);
  }
}

// TODO: interceptor ami mindig elküldi a username-et
// TODO: service ami kezeli az http hívásokat

