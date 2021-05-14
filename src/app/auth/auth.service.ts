import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  timer: any;

  autoLogout(expirationTime: number) {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.store.dispatch(new AuthActions.userLogOut());
    }, expirationTime);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
