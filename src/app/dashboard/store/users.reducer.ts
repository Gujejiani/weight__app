import { User } from 'src/app/profile/user.modal';
import * as ActionTypes from './users.actions';

export interface State {
  users: User[];
  user: User;
}

const initialState: State = {
  users: [],
  user: null,
};

export function usersReducer(
  state: State = initialState,
  action: ActionTypes.UsersAction
) {
  switch (action.type) {
    case ActionTypes.FETCHING_USERS:
      return {
        ...state,
        users: action.payload.users,
        user: action.payload.loggedUser,
      };
    case ActionTypes.ADD_WEIGHT:
      const weights = [...state.user.weights];
      weights.push(action.payload.weight);
      const user = { ...state.user };
      user.weights = weights;
      return {
        ...state,
        user: user,
      };
    case ActionTypes.UPDATE_USER:
      const email = state.user.email;
      let index = state.users.findIndex((user) => user.email === email);
      if (index >= 0) {
        const updatedUsers = [...state.users];
        updatedUsers[index] = { ...state.user };
        return {
          ...state,
          users: updatedUsers,
        };
      } else {
        return state;
      }
    case ActionTypes.WEIGHTS_UPDATE:
      const userCopy = { ...state.user };
      userCopy.weights = action.payload.weights;
      return {
        ...state,
        user: userCopy,
      };
    default:
      return state;
  }
}
