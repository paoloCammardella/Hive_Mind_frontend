import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _snackBar: MatSnackBar) { }

  hide = signal(false);
  toastr = inject(ToastrService);
  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);

  submitted = false; // l'utente ha gia provato a fare un accesso?
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ])
  });

  clickEvent(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  handleLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this._snackBar.open("Please, insert username and password", "Ok!", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'error-snackbar' // Classe CSS per errore
      });
    } else {
      this.userService.login({
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token);
          this._snackBar.open('Operazione completata con successo!', 'Chiudi', {
            duration: 3000, // Durata in millisecondi
            verticalPosition: 'top', // Posizione verticale: 'top' o 'bottom'
            horizontalPosition: 'right', // Posizione orizzontale: 'start', 'center', 'end', 'left', 'right'
            panelClass: 'success-snackbar' // Classe CSS per successo
          });
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Please, insert a valid username and password', 'Oops! Invalid credentials');
        }
      });
    }
  }

  navigateSignUp() {
    this.router.navigateByUrl('/signup');
  }
}
