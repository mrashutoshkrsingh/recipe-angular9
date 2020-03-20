import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { clearTimeout } from "timers";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  tokenExpirationTimer: NodeJS.Timeout;
  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User>(null);
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPar_bK8MhGtrOn9SnQBTiJZbL3fvsKkI",
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => {
          let errorMessage = "An unknown error occurred!";
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists!";
          }
          return throwError(errorMessage);
        }),
        tap(resData => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
          this.autoLogOut(+resData.expiresIn);
          localStorage.setItem("userData", JSON.stringify(user));
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPar_bK8MhGtrOn9SnQBTiJZbL3fvsKkI",
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => {
          // console.log(errorRes, errorRes.error.error.message);
          let errorMessage = "An unknown error occurred!";
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_NOT_FOUND":
              errorMessage =
                " There is no user record corresponding to this identifier. The user may have been deleted!";
              break;
            case "INVALID_PASSWORD":
              errorMessage =
                " The password is invalid or the user does not have a password!";
              break;
            case "USER_DISABLED":
              errorMessage =
                "The user account has been disabled by an administrator!";
              break;
          }
          return throwError(errorMessage);
        }),
        tap(resData => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
          this.autoLogOut(+resData.expiresIn);
          localStorage.setItem("userData", JSON.stringify(user));
        })
      );
  }

  autoLogIn() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.user.next(userData);
    if (userData) {
      const time =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(time);
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  logOut() {
    this.user.next(null);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
    localStorage.removeItem("userData");
    this.router.navigate(["/auth"]);
  }
}
