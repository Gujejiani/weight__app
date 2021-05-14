import { Action } from '@ngrx/store';
import { User } from 'src/app/profile/user.modal';
import { Activity } from '../activity/activity.modal';
import { Meal } from '../meals/meal.modal';
import { Weight } from '../weight/weight.modal';
import * as ActionTypes from './actionTypes';
export class fetchingUserAndUsers implements Action {
  readonly type = ActionTypes.FETCHING_USERS;
  constructor(public payload: { users: User[]; loggedUser: User }) {}
}

export class LoggedOut implements Action {
  readonly type = ActionTypes.LOGGED_OUT;
}

export class updateUser implements Action {
  readonly type = ActionTypes.UPDATE_USER;
}

export class weightsArrayUpdate implements Action {
  readonly type = ActionTypes.WEIGHTS_UPDATE;

  constructor(public payload: { weights: Weight[] }) {}
}

export class desiredWeightAdded implements Action {
  readonly type = ActionTypes.DESIRED_WEIGHT_ADDED;

  constructor(public payload: { desiredWeight: number }) {}
}

export class mealsArrayUpdate implements Action {
  readonly type = ActionTypes.MEALS_UPDATE;

  constructor(public payload: { meals: Meal[] }) {}
}
export class desiredMealAdded implements Action {
  readonly type = ActionTypes.DESIRED_MEAL_ADDED;
  constructor(public payload: { desiredMeal: number }) {}
}
export class activitiesArrayUpdate implements Action {
  readonly type = ActionTypes.ACTIVITIES_UPDATE;
  constructor(public payload: { activities: Activity[] }) {}
}
export class desiredActivityAdded implements Action {
  readonly type = ActionTypes.DESIRED_ACTIVITY_ADDED;
  constructor(public payload: { desiredActivity: number }) {}
}

export class autoLogin implements Action {
  readonly type = ActionTypes.AUTO_LOGIN;
  constructor(public payload: { user: User }) {}
}
export class fetchingOnlyUsers implements Action {
  readonly type = ActionTypes.FETCHING_ONLY_USERS;
  constructor(public payload: { users: User[] }) {}
}
export class userRegistered implements Action {
  readonly type = ActionTypes.USER_REGISTERED;
  constructor(public payload: { user: User }) {}
}

export class storeUsers implements Action {
  readonly type = ActionTypes.STORE_USERS;
}
export type UsersAction =
  | fetchingUserAndUsers
  | updateUser
  | weightsArrayUpdate
  | desiredWeightAdded
  | mealsArrayUpdate
  | desiredMealAdded
  | activitiesArrayUpdate
  | desiredActivityAdded
  | LoggedOut
  | autoLogin
  | fetchingOnlyUsers
  | userRegistered
  | storeUsers;
