import { Action } from '@ngrx/store';
import { User } from 'src/app/profile/user.modal';

export const LOGIN = 'LOGIN';

export class UserLoggedIn implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}
export type AuthActions = UserLoggedIn;
