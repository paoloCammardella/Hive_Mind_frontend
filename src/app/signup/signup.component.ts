import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { last } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // Nota la correzione di 'styleUrl' a 'styleUrls'
})

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class SignupComponent {


  constructor(private _snackBar: MatSnackBar) { }

  hidePassword = signal(false);
  hideConfirmPassword = signal(false);

  togglePasswordVisibility(event:Event){
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  toggleConfirmPasswordVisibility(event:Event){
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }

  toastr = inject(ToastrService);
  router = inject(Router);
  userService = inject(UserService);
  submitted = false;

  matcher = new MyErrorStateMatcher();

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  });

  checkPassword(password: string, confirmPassword: string): boolean {
    if (password !== confirmPassword) {
      this._snackBar.open("Passowrds doesn't match", "Ok!");
      return false;
    }
    return true;
  }

  handleSignup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      this._snackBar.open("Some fields are empty", "Ok!")
    } else {
      if (this.checkPassword(this.signupForm.value.email as string,
        this.signupForm.value.confirmPassword as string)) {
        this.userService.signup({
          username: this.signupForm.value.username as string,
          firstname: this.signupForm.value.firstName as string,
          lastname: this.signupForm.value.lastName as string,
          email: this.signupForm.value.email as string,
          password: this.signupForm.value.password as string,
        }).subscribe({
          error: (err) => {
            this.toastr.error("The username you selected was already taken", "Oops! Could not create a new user");
          },
          complete: () => {
            this.toastr.success(`You can now login with your new account`, `Congrats ${this.signupForm.value.username}!`);
            this.router.navigateByUrl("/login");
          }
        });
        this.toastr.success(`You can now login with your new account`, `Congrats ${this.signupForm.value.username}!`);

      }
    }
  }
}
