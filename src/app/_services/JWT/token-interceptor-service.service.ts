import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

export const TokenInterceptorService: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  const router = inject(Router);

  if (environment.user.auth !== req.url && environment.user.signup !== req.url) {
    if (!authService.verifyToken(authToken)) {
      localStorage.clear();
      setTimeout(() => router.navigateByUrl('/login'), 0);
      return throwError(() => new Error('Token not valid or expired'));
    }
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401 || error.status === 403) {
        localStorage.clear();
        setTimeout(() => router.navigateByUrl('/login'), 0);
      }
      return throwError(() => error);
    })
  );
};
