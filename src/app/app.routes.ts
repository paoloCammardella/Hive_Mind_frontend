import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
    title: "Sign Up"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Log in"
  },
  {
    path: "",
    component: LandingComponent,
    title: "Hive Mind"
  }
];
