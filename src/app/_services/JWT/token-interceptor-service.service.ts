import { inject, } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptorService: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  const authToken = authService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};