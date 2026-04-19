import { Component, input } from '@angular/core';
import { IApplication } from '../types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-applications',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
})
export class Applications {
  applicationList = input<IApplication[]>();

  onAdd(app: IApplication) {
    console.log('add', app);
  }

  onDelete(app: IApplication) {
    console.log('delete', app);
  }
}
