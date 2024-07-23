import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { SignupComponent } from './pages/signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenInterceptorService } from './_services/JWT/token-interceptor-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  providers:  [],
  imports: [RouterOutlet, EditorModule, SignupComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hive_Mind_frontend';
  text = 'prova';
}
