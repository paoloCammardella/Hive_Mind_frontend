import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // Nota la correzione di 'styleUrl' a 'styleUrls'
})
export class SignupComponent {
  hide = signal(true);
  confirmHide = signal(true);

  confirmClickEvent(event: MouseEvent) {
    this.confirmHide.set(!this.confirmHide());
    event.stopPropagation();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  toastr = inject(ToastrService);
  router = inject(Router);
  userService = inject(UserService);
  submitted = false;

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  });

  handleSignup() {
    console.log("Signup");
    this.submitted = true;
    if (this.signupForm.invalid) {
      this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    } else {
      this.userService.signup({
        usr: this.signupForm.value.user as string,
        pwd: this.signupForm.value.password as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("The username you selected was already taken", "Oops! Could not create a new user");
        },
        complete: () => {
          this.toastr.success(`You can now login with your new account`, `Congrats ${this.signupForm.value.user}!`);
          this.router.navigateByUrl("/login");
        }
      });
    }
  }
}
