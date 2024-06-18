import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [

  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "signup",
    component: SignupComponent,
    title: "Sign Up | Hive Mind"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Log in | Hive Mind"
  }, {
    path: "forgotpassword",
    component: ForgotPasswordComponent,
    title: "Forgot password | Hive Mind"
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];
