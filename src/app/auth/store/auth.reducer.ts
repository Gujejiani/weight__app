import { User } from 'src/app/profile/user.modal';
import * as ActionTypes from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(
  state = initialState,
  action: ActionTypes.AuthActions
) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.LOGOUT:
      let user = { ...state.user };
      user = null;
      return {
        ...state,
        user: user,
      };
    default:
      return state;
  }
}
