import { ActivatedRouteSnapshot, ResolveFn, Router, Routes } from '@angular/router';
import { Login } from './login/login';
import { User } from './user/user';
import { inject } from '@angular/core/primitives/di';
import { UserService } from './services/user-service';
import { Applications } from './applications/applications';
import { Users } from './users/users';

export const userResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
    const userService = inject(UserService);
    const username = route.paramMap.get('username');
    if (!username) {
        return null;
    }
    return userService.getUser(username);
};

export const applicationsResolver: ResolveFn<any> = () => {
    const userService = inject(UserService);
    return userService.getApplications();
};
    
export const usersResolver: ResolveFn<any> = () => {
    const userService = inject(UserService);
    return userService.getUsers();
};

export const routes: Routes = [
    {
        path: '',
        component: Login,
    },
    {
        path: 'user/:username',
        component: User,
        canActivate: [(route: ActivatedRouteSnapshot) => {
            const router = inject(Router);

            const storedUsername = localStorage.getItem('username');
            const routeUsername = route.paramMap.get('username');
            if (storedUsername && storedUsername === routeUsername) {
                return true;
            }
            return router.createUrlTree(['']);
        }],
        resolve: {
            user: userResolver
        },
        children: [
            {
                path: 'apps',
                component: Applications,
                resolve: {
                    applicationList: applicationsResolver
                },
            },
            {
                path: 'users',
                component: Users,
                resolve: {
                    users: usersResolver
                },
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
];
