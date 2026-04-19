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
  //private userService = inject(UserService);
  protected enteredUsername: string = '';
  //protected errorMsg: string | null = null;

  onSubmit() {
    // const user: IUser = {
    //   name: this.enteredUsername,
    //   isAdmin: true,
    //   background: '',
    //   menuItems: []
    // };
    // this.userService.createAdminUser(user).subscribe({
    //   next: () => {
    //     this.router.navigate(['/user', this.enteredUsername]);
    //     localStorage.setItem('username', this.enteredUsername);
    //     this.errorMsg = null;
    //   },
    //   error: (err) => {
    //     this.errorMsg = 'Hiba bejelentkezésnél: ' + err.message;
    //   }
    // });

    this.router.navigate(['/user', this.enteredUsername]);
    localStorage.setItem('username', this.enteredUsername);
  }
}
