import { Action } from '@ngrx/store';
import { User } from 'src/app/profile/user.modal';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class userLoggedIn implements Action {
  readonly type = LOGIN;
  constructor(public payload: User) {}
}
export class userLogOut implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = userLoggedIn | userLogOut;
