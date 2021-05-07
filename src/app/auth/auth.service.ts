import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../profile/user.modal';
import { AppState } from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import * as UsersActions from '../dashboard/store/users.actions';
import { DatabaseService } from '../database/database.service';
export interface LoginData {
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string | Date;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    private database: DatabaseService
  ) {}
  timer;
  signUp(user: User) {
    return this.http
      .post<LoginData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn6LqFnm62eH7S1XoZlrcihTl-VxbybYA',
        {
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandling),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    this.clearTimer();
    return this.http
      .post<LoginData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn6LqFnm62eH7S1XoZlrcihTl-VxbybYA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandling),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
    const userCredits: LoginData = {
      email: email,
      localId: userId,
      idToken: token,
      expiresIn: expirationTime,
    };

    // this.autoLogout(expiresIn * 1000);
    this.autoLogout(expiresIn * 1000);
  }

  autoLogout(expirationTime) {
    console.log('logouts in ' + expirationTime);
    this.timer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  logout() {
    this.store.dispatch(new AuthActions.userLogOut());
    this.router.navigate(['/login']);
    this.store.dispatch(new UsersActions.LoggedOut());
    this.database.updateUsers();
    localStorage.removeItem('userData');

    this.clearTimer();
  }

  autoLogin() {
    this.clearTimer();
    const user: User = JSON.parse(localStorage.getItem('userData'));
    if (!user) return;
    this.store.dispatch(new AuthActions.userLoggedIn(user));
    this.store.dispatch(new UsersActions.autoLogin({ user: user }));
    this.database.getDataFromFirebase(user.token, user.email, true);
    this.autoLogout(3600000);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private errorHandling(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    console.log(errorResponse);
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email is already exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'password is invalid';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'email does not exist';
        break;
    }
    return throwError(errorMessage);
  }
}
