import { Action } from '@ngrx/store';

import { User } from 'src/app/profile/user.modal';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = 'LOGIN_START';
export const EFFECT_LOGIN = 'effect';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const FETCHING_START = 'FETCHING_START';
export const REGISTRATION_START = 'REGISTRATION START';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTO_LOGIN_SUCCESS = '[auth] AUTO_LOGIN';
export const AUTO_LOGIN_START = 'AUTO_LOGIN_START';
export class registrationStart implements Action {
  readonly type = REGISTRATION_START;
  constructor(public payload: User) {}
}

export class fetchingStart implements Action {
  readonly type = FETCHING_START;
  constructor(
    public payload: {
      token: string | boolean;
      email: string;
      onlyUsers: boolean;
      registeredUser?: User;
    }
  ) {}
}

export class autoLoginStart implements Action {
  readonly type = AUTO_LOGIN_START;
}

export class userLoggedIn implements Action {
  readonly type = LOGIN;
  constructor(public payload: User) {}
}
export class effectLogin implements Action {
  readonly type = EFFECT_LOGIN;
}
export class userLogOut implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ErrorOcurred implements Action {
  readonly type = ERROR_MESSAGE;
  constructor(public payload: { message: string }) {}
}
export class clearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export type AuthActions =
  | userLoggedIn
  | userLogOut
  | LoginStart
  | effectLogin
  | ErrorOcurred
  | registrationStart
  | clearError
  | AutoLogin;
