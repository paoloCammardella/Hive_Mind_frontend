import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthGuardService } from './_guard/AuthGuard';

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
        title: 'Home | Hive Mind',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];
