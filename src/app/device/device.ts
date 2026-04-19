import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMenuItem } from '../types';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device implements OnInit {
  private http = inject(HttpClient);

  menuItems = signal<IMenuItem[]>([]);
  openFolderId: number | null = null;

  ngOnInit() {
    this.http.get<IMenuItem[]>('/api/menu').subscribe(items => this.menuItems.set(items));
  }

  toggleFolder(id: number) {
    this.openFolderId = this.openFolderId === id ? null : id;
  }
}