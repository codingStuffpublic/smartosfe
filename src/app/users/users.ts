import { HttpClient } from '@angular/common/http';
import { Component , inject,  signal } from '@angular/core';

interface User {
  name: string;
  id: number;
}

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private http = inject(HttpClient);
  protected users = signal<User[]>([]);

  ngOnInit(): void {
    this.http.get<User[]>("/api/users").subscribe(
      (response) => {
        this.users.set(response);
        console.log(response);
      }
    );
  }
}
