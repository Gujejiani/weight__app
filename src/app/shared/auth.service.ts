// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// import { throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { User } from '../profile/user.modal';

// export interface LoginData {
//   idToken: string;
//   email: string;
//   refreshToken?: string;
//   expiresIn: string | Date;
//   localId: string;
//   registered?: boolean;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   signUp(user: User) {
//     this.http
//       .post<LoginData>(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn6LqFnm62eH7S1XoZlrcihTl-VxbybYA',
//         {
//           email: user.email,
//           password: user.password,
//           returnSecureToken: true,
//         }
//       )
//       .pipe(
//         catchError(this.errorHandling),
//         tap((resData) => {
//           this.handleAuthentication(
//             resData.email,
//             resData.localId,
//             resData.idToken,
//             +resData.expiresIn
//           );
//         })
//       )
//       .subscribe((resData) => {
//         console.log(resData);
//       });
//   }

//   login(email: string, password: string) {
//     this.http
//       .post<LoginData>(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn6LqFnm62eH7S1XoZlrcihTl-VxbybYA',
//         {
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }
//       )
//       .pipe(
//         catchError(this.errorHandling),
//         tap((resData) => {
//           this.handleAuthentication(
//             resData.email,
//             resData.localId,
//             resData.idToken,
//             +resData.expiresIn
//           );
//         })
//       )
//       .subscribe(
//         (resData) => {
//           console.log(resData);
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//   }
//   private handleAuthentication(
//     email: string,
//     userId: string,
//     token: string,
//     expiresIn: number
//   ) {
//     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//     const userCredits: LoginData = {
//       email: email,
//       localId: userId,
//       idToken: token,
//       expiresIn: expirationDate,
//     };

//     // this.autoLogout(expiresIn * 1000);
//     localStorage.setItem('userData', JSON.stringify(userCredits));
//   }

//   private errorHandling(errorResponse: HttpErrorResponse) {
//     let errorMessage = 'An unknown error occurred';
//     console.log(errorResponse);
//     if (!errorResponse.error || !errorResponse.error.error) {
//       return throwError(errorMessage);
//     }
//     switch (errorResponse.error.error.message) {
//       case 'EMAIL_EXISTS':
//         errorMessage = 'This Email is already exist';
//         break;
//       case 'INVALID_PASSWORD':
//         errorMessage = 'password is invalid';
//         break;
//       case 'EMAIL_NOT_FOUND':
//         errorMessage = 'email does not exist';
//         break;
//     }
//     return throwError(errorMessage);
//   }
// }
