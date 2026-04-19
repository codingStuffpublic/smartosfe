import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';


export const usernameInterceptor: HttpInterceptorFn = (req, next) => {
  const username = localStorage.getItem('username');

  if (!username) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      'X-username': username
    }
  });

  return next(cloned);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([usernameInterceptor])
    )
  ]
};
