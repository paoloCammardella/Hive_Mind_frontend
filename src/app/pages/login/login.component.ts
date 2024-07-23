import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';
import { UserService } from '../../_services/user/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '../../_services/snackBar/snack-bar.service';

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

  hide = signal(false);
  
  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);
  snackBarService = inject(SnackBarService);

  submitted = false; 
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
      this.snackBarService.showSnackBar("Invalid credentials, try again", '', undefined, 'error');
    } else {
      this.userService.login({
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token);
          this.snackBarService.showSnackBar('Logged in successfully.', '', undefined, 'success');
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.snackBarService.showSnackBar("Login failed, please try again", '', undefined, 'error');
          console.log(err);
        }
      });
    }
  }

  navigateSignUp() {
    this.router.navigateByUrl('/signup');
  }
}
