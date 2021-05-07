import { Action } from '@ngrx/store';
import { User } from 'src/app/profile/user.modal';
import { Activity } from '../activity/activity.modal';
import { Meal } from '../meals/meal.modal';
import { Weight } from '../weight/weight.modal';

export const FETCHING_USERS = 'FETCHING_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_WEIGHT = 'ADD_WEIGH';
export const WEIGHTS_UPDATE = 'WEIGHTS_UPDATE';
export const DESIRED_WEIGHT_ADDED = 'DESIRED_WEIGHT_ADDED';
export const MEALS_UPDATE = 'MEALS_UPDATE';
export const DESIRED_MEAL_ADDED = 'DESIRED_MEAL_ADDED';
export const ACTIVITIES_UPDATE = 'ACTIVITIES_UPDATE';
export const DESIRED_ACTIVITY_ADDED = 'DESIRED_ACTIVITY_ADDED';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const FETCHING_ONLY_USERS = 'FETCHING_ONLY_USERS ';
export class fetchingUserAndUsers implements Action {
  readonly type = FETCHING_USERS;
  constructor(public payload: { users: User[]; loggedUser: User }) {}
}

export class LoggedOut implements Action {
  readonly type = LOGGED_OUT;
}

export class updateUser implements Action {
  readonly type = UPDATE_USER;
}

export class weightsArrayUpdate implements Action {
  readonly type = WEIGHTS_UPDATE;

  constructor(public payload: { weights: Weight[] }) {}
}

export class desiredWeightAdded implements Action {
  readonly type = DESIRED_WEIGHT_ADDED;

  constructor(public payload: { desiredWeight: number }) {}
}

export class mealsArrayUpdate implements Action {
  readonly type = MEALS_UPDATE;

  constructor(public payload: { meals: Meal[] }) {}
}
export class desiredMealAdded implements Action {
  readonly type = DESIRED_MEAL_ADDED;
  constructor(public payload: { desiredMeal: number }) {}
}
export class activitiesArrayUpdate implements Action {
  readonly type = ACTIVITIES_UPDATE;
  constructor(public payload: { activities: Activity[] }) {}
}
export class desiredActivityAdded implements Action {
  readonly type = DESIRED_ACTIVITY_ADDED;
  constructor(public payload: { desiredActivity: number }) {}
}

export class autoLogin implements Action {
  readonly type = AUTO_LOGIN;
  constructor(public payload: { user: User }) {}
}
export class fetchingOnlyUsers implements Action {
  readonly type = FETCHING_ONLY_USERS;
  constructor(public payload: { users: User[] }) {}
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
  | fetchingOnlyUsers;
