import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

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
