import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { SignupComponent } from './pages/signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './_services/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, EditorModule, SignupComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    if (this.authService.verifyToken(localStorage.getItem('token'))) {
      this.router.navigateByUrl("/home");
    }else{
      this.router.navigateByUrl("/login");
    }
  }
}
