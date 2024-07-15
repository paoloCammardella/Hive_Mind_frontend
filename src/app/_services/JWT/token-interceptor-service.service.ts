import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';

import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptorService: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  const authToken = authService.getToken();

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};