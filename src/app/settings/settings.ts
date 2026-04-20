import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [MatListModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  private http = inject(HttpClient);
  readonly themes = ['LIGHT', 'DARK'];
  backgrounds = signal<string[]>([]);
  newBackground = '';
  expandedSection: string | null = null;
  username = localStorage.getItem('username') ?? '';

  ngOnInit() {
    this.http.get<any>(`/api/users/${this.username}`).subscribe(user => {
      this.backgrounds.set(user.backgrounds ?? []);
    });
  }

  toggleSection(section: string) {
    this.expandedSection = this.expandedSection === section ? null : section;
  }

  setTheme(theme: string) {
    this.http.put(`/api/users/${this.username}/theme`, null, { params: { theme } }).subscribe(() => {
      if (theme === 'DARK') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });
  }

  addBackground() {
    if (!this.newBackground.trim()) return;
    this.http.post(`/api/users/${this.username}/background`, null, { params: { backgroundName: this.newBackground } })
      .subscribe(() => {
        this.backgrounds.update(b => [...b, this.newBackground]);
        this.newBackground = '';
      });
  }

  selectBackground(bg: string) {
    this.http.put(`/api/users/${this.username}/background`, null, { params: { backgroundName: bg } }).subscribe();
  }
}