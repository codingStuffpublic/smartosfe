import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  username = signal('');
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        this.username.set(params.get('username') ?? '');
    });
  }
}
