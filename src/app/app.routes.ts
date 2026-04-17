import { Routes } from '@angular/router';
import { Login } from './login/login';
import { User } from './user/user';

export const routes: Routes = [
    {
    path: '',
    component: Login,
  },
{
    path: 'user/:username',
    component: User,
  }
];
