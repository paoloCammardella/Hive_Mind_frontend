import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  hide = signal(false);
  clickEvent(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  toastr = inject(ToastrService);
  router = inject(Router);

  userService = inject(UserService);
  authService = inject(AuthService);

  submitted = false; // l'utente ha gia provato a fare un accesso?
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  })

  handleLogin() {
    this.submitted = true;
    this.router.navigateByUrl("/home");
    console.log("Signin");
    // if (this.loginForm.invalid) {
    //   this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    // } else {
    //   this.userService.login({
    //     usr: this.loginForm.value.user as string,
    //     pwd: this.loginForm.value.pass as string,
    //   }).subscribe({
    //     next: (token) => {
    //       this.authService.updateToken(token);
    //     },
    //     error: (err) => {
    //       this.toastr.error("Please, insert a valid username and password", "Oops! Invalid credentials");
    //     },
    //     complete: () => {
    //       this.toastr.success(`You can now manage your to-dos`, `Welcome ${this.loginForm.value.user}!`);
    //       this.router.navigateByUrl("/home");
    //     }
    //   })
    // }
  }

  navigateSignUp() {
    this.router.navigateByUrl("/signup");
  }
}