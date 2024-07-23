import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../_services/auth/auth.service";
import { inject } from "@angular/core";

export const AuthGuardService: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  
    const authService = inject(AuthService);
    const token = localStorage.getItem('token');
    const router = inject(Router);
    if(!authService.verifyToken(token)){
      localStorage.clear();
      return router.createUrlTree(['/login']);
    }
   
    return  true;
  };