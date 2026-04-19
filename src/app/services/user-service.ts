import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public getUser(username: string) {
    return this.http.get<IUser>(`/api/users/${username}`);
  }

  public getUsers() {
    return this.http.get<IUser[]>('/api/users');
  }

  public createAdminUser(user: IUser) {
    return this.http.post('/api/users', user);
  }

  public createUser(user: IUser) {
    return this.http.post('/api/users', user);
  }

  public getApplications() {
    return this.http.get<any[]>('/api/apps');
  }

public createGroup(username: string, groupName: string) {
  const params = new HttpParams()
    .set('name', username)
    .set('group', groupName);

  return this.http.post('/api/users/create-group', null, { params });
}
}
