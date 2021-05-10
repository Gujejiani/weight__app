import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUsers from '../dashboard/store/users.reducer';

export interface AppState {
  auth: fromAuth.State;
  data: fromUsers.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  data: fromUsers.usersReducer,
};
