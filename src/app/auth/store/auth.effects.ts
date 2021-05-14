import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { User } from 'src/app/profile/user.modal';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import * as UserActionTypes from '../../dashboard/store/actionTypes';
export interface LoginData {
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string | Date;
  localId: string;
  registered?: boolean;
}

const errorHandler = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred';

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.ErrorOcurred({ message: errorMessage }));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This Email  already exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Password is invalid';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Email does not exist';
      break;
  }
  return of(new AuthActions.ErrorOcurred({ message: errorMessage }));
};

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      mergeMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<LoginData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn6LqFnm62eH7S1XoZlrcihTl-VxbybYA',
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              const expirationTime = +resData.expiresIn * 1000;

              this.authService.autoLogout(expirationTime);
              return resData;
            }),
            map((resData) => {
              return new AuthActions.fetchingStart({
                token: resData.idToken,
                email: resData.email,
                onlyUsers: false,
                registeredUser: null,
              });
            }),
            catchError((err: HttpErrorResponse) => {
              console.log('errr');
              return errorHandler(err);
            })
          );
      })
    )
  );

  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTRATION_START),
      mergeMap((user: AuthActions.registrationStart) => {
        return this.http
          .post<LoginData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn6LqFnm62eH7S1XoZlrcihTl-VxbybYA',
            {
              email: user.payload.email,
              password: user.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return new AuthActions.fetchingStart({
                token: resData.idToken,
                email: resData.email,
                onlyUsers: true,
                registeredUser: user.payload,
              });
            }),
            catchError((err) => {
              return errorHandler(err);
            })
          );
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => localStorage.removeItem('userData'))
      ),
    { dispatch: false }
  );

  authLoginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN_START),
      map(() => {
        const user: User = JSON.parse(localStorage.getItem('userData'));
        if (!user) return { type: 'DUMMY' };
        this.authService.autoLogout(3600000);
        return new AuthActions.AutoLogin(user);
      })
    )
  );

  clearErrorMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.USER_REGISTERED),
      map(() => new AuthActions.clearError())
    )
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService
  ) {}
}
