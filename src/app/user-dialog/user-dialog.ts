import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.scss',
})
export class UserDialog {
  name: string = '';
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<UserDialog>);

  submit() {
    if (!this.name.trim()) return;

    const user = {
      name: this.name,
      isAdmin: false,
      background: '',
      menuItems: []
    };
    this.userService.createUser(user).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Failed to create user', err);
      }
    });
  }
}
