import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.error = null;
      if (this.isLoginMode) {
        // ...
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
            console.log(data);
            this.isLoading = false;
            this.router.navigate(["/recipes"]);
          },
          error => {
            this.error = error;
            console.log(error);
            this.isLoading = false;
          }
        );
      } else {
        this.authService
          .signup(form.value.email, form.value.password)
          .subscribe(
            data => {
              console.log(data);
              this.isLoading = false;
              this.router.navigate(["/recipes"]);
            },
            error => {
              this.error = error;
              console.log(error);
              this.isLoading = false;
            }
          );
      }
    }
    form.reset();
  }
}
