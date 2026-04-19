import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { IUser } from '../types';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private userService = inject(UserService);
  protected registeredUsername: string = '';
  protected registeredGroupname: string = '';
  protected enteredUsername: string = '';

  onLogin() {
    this.userService.getUser(this.enteredUsername).subscribe(
      () => {
        this.navigateAndSave(this.enteredUsername);
      }
    );
  }

  onCreateGroup() {
    this.userService.createGroup(this.registeredUsername, this.registeredGroupname).subscribe(
      () => {
        this.navigateAndSave(this.registeredUsername);
      }
    );
  }

  navigateAndSave(username: string) {
    this.router.navigate(['/user', username]);
    localStorage.setItem('username', username);
  }
}
