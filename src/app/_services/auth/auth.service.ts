import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { TokenInterceptorService } from '../JWT/token-interceptor-service.service';
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authState: WritableSignal<AuthState> = signal<AuthState>({
    user: this.getUser(),
    token: this.getToken(),
    isAuthenticated: this.verifyToken(this.getToken())
  })

    verifyToken(token: string | null): boolean {
    if(token !== null){
      try{
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        if(expiration === undefined || Date.now() >= expiration * 1000){
          return false; 
        } else {
          return true; 
        }
      } catch(error) {  
        return false;
      }
    }
    return false;
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getUser(){
    return localStorage.getItem("user");
  }
  user = computed(() => this.authState().user);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor(){
    effect( () => {
      const token = this.authState().token;
      const user = this.authState().user;
      if(token !== null){
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      if(user !== null){
        localStorage.setItem("user", user);
      } else {
        localStorage.removeItem("user");
      }
    });
  }

  updateToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const user = decodedToken.user;
    this.authState.set({
      user: user,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout(){
    this.authState.set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
}
