import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUsers from '../dashboard/store/users.reducer';
import * as fromWeight from '../dashboard/weight/store/weight.reducer';

export interface AppState {
  auth: fromAuth.State;
  data: fromUsers.State;
  weights: fromWeight.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  data: fromUsers.usersReducer,
  weights: fromWeight.weightReducer,
};
