import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { IApplication, IMenuItem } from '../types';

@Component({
  selector: 'app-menu',
  imports: [MatListModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private http = inject(HttpClient);

  readonly icons = ['home', 'star', 'favorite', 'map', 'brush', 'sports_esports', 'contacts', 'search', 'settings', 'apps', 'work'];
selectedItem: IMenuItem | null = null;

selectItem(item: IMenuItem) {
    this.selectedItem = item;
}
  menuItems = signal<IMenuItem[]>([]);
  applications = signal<IApplication[]>([]);
  editingId: number | null = null;
  editingName = '';
  newFolderName = '';
  iconPickerId: number | null = null;
  expandedFolderIds = new Set<number>();
  addingToFolderId: number | null = null;

  ngOnInit() {
    this.loadMenu();
    this.loadApps();
  }

  loadMenu() {
    this.http.get<IMenuItem[]>('/api/menu').subscribe(items => this.menuItems.set(items));
  }

  loadApps() {
    this.http.get<IApplication[]>('/api/apps').subscribe(apps => this.applications.set(apps));
  }

 addApp(application: IApplication) {
console.log('selectedItem:', this.selectedItem)
 
 
  if (this.selectedItem) {
    this.http.post(`/api/menu/${this.selectedItem.id}/app/${application.id}`, null)
      .subscribe(() => this.loadMenu());
  } else {
    this.http.post('/api/menu/app', null, { 
      params: { appId: application.id } 
    }).subscribe(() => this.loadMenu());
  }
}

createFolder() {
  if (!this.newFolderName.trim()) return;
  
  this.http.post('/api/menu/folder', null, { 
    params: { folderName: this.newFolderName } 
  }).subscribe(() => {
    this.newFolderName = '';
    this.loadMenu();
  });

}

toggleFolder(id: number) {
    if (this.expandedFolderIds.has(id)) {
        this.expandedFolderIds.delete(id);
    } else {
        this.expandedFolderIds.add(id);
    }
}

  toggleAddToFolder(id: number) {
    this.addingToFolderId = this.addingToFolderId === id ? null : id;
  }

  startEdit(item: IMenuItem) {
    this.editingId = item.id;
    this.editingName = item.name;
  }

  saveEdit(item: IMenuItem) {
    this.http.put(`/api/menu/${item.id}`, null, { params: { name: this.editingName } }).subscribe(() => {
      this.editingId = null;
      this.loadMenu();
    });
  }

  deleteItem(item: IMenuItem) {
    this.http.delete(`/api/menu/${item.id}`).subscribe(() => this.loadMenu());
  }

  toggleIconPicker(item: IMenuItem) {
    this.iconPickerId = this.iconPickerId === item.id ? null : item.id;
  }

  setIcon(item: IMenuItem, icon: string) {
    this.http.put(`/api/menu/${item.id}/icon`, null, { params: { iconName: icon } }).subscribe(() => {
      this.iconPickerId = null;
      this.loadMenu();
    });
  }

  removeIcon(item: IMenuItem) {
    this.http.delete(`/api/menu/${item.id}/icon`).subscribe(() => this.loadMenu());
  }
}