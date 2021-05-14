import { User } from 'src/app/profile/user.modal';
import * as ActionTypes from './auth.actions';

export interface State {
  user: User;
  loading: boolean;
  errorMessage: string;
}

const initialState: State = {
  user: null,
  loading: false,
  errorMessage: '',
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
        loading: false,
      };
    case ActionTypes.LOGOUT:
      let user = { ...state.user };
      user = null;
      return {
        ...state,
        user: user,
      };
    case ActionTypes.EFFECT_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.message,
        loading: false,
      };
    case ActionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
        loading: false,
      };
    case ActionTypes.AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
