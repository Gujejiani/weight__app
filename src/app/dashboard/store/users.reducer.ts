import { User } from 'src/app/profile/user.modal';
import * as ActionTypes from './actionTypes';
import { UsersAction } from './users.actions';
export interface State {
  users: User[];
  user: User;
}
const initialState: State = {
  users: [],
  user: null,
};

export function usersReducer(state: State = initialState, action: UsersAction) {
  const userCopy = { ...state.user };
  const desiredCopy = { ...userCopy.desired };
  switch (action.type) {
    case ActionTypes.FETCHING_USERS:
      return {
        ...state,
        users: action.payload.users,
        user: action.payload.loggedUser,
      };
    case ActionTypes.USER_REGISTERED:
      const usersCopy = [...state.users];
      usersCopy.push(action.payload.user);
      return {
        ...state,
        users: usersCopy,
      };
    case ActionTypes.AUTO_LOGIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionTypes.FETCHING_ONLY_USERS:
      return {
        ...state,
        users: action.payload.users,
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
      userCopy.weights = action.payload.weights;
      return {
        ...state,
        user: userCopy,
      };
    case ActionTypes.DESIRED_WEIGHT_ADDED:
      const desired = action.payload.desiredWeight;
      desiredCopy.weight = desired;
      userCopy.desired = desiredCopy;

      return {
        ...state,
        user: userCopy,
      };
    case ActionTypes.MEALS_UPDATE:
      userCopy.meals = action.payload.meals;
      return {
        ...state,
        user: userCopy,
      };
    case ActionTypes.DESIRED_MEAL_ADDED:
      desiredCopy.meal = action.payload.desiredMeal;
      userCopy.desired = desiredCopy;
      return {
        ...state,
        user: userCopy,
      };
    case ActionTypes.ACTIVITIES_UPDATE:
      userCopy.activities = action.payload.activities;
      return {
        ...state,
        user: userCopy,
      };
    case ActionTypes.DESIRED_ACTIVITY_ADDED:
      desiredCopy.activity = action.payload.desiredActivity;

      userCopy.desired = desiredCopy;
      return {
        ...state,
        user: userCopy,
      };
    case ActionTypes.LOGGED_OUT:
      const users = [...state.users];
      const copiedUsers = [];
      users.forEach(({ ...user }) => {
        copiedUsers.push(user);
      });
      copiedUsers.forEach((user) => {
        user.token = false;
      });
      return {
        ...state,
        user: null,
        users: copiedUsers,
      };
    default:
      return state;
  }
}
