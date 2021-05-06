import { Action } from '@ngrx/store';
import { User } from 'src/app/profile/user.modal';
import { Weight } from '../weight/weight.modal';

export const FETCHING_USERS = 'FETCHING_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_WEIGHT = 'ADD_WEIGH';
export const WEIGHTS_UPDATE = 'WEIGHTS_UPDATE';

export class fetchingUserAndUsers implements Action {
  readonly type = FETCHING_USERS;

  constructor(public payload: { users: User[]; loggedUser: User }) {}
}

export class updateUser implements Action {
  readonly type = UPDATE_USER;
}

export class addWeight implements Action {
  readonly type = ADD_WEIGHT;

  constructor(public payload: { weight: Weight }) {}
}

export class weightsArrayUpdate implements Action {
  readonly type = WEIGHTS_UPDATE;

  constructor(public payload: { weights: Weight[] }) {}
}

export type UsersAction =
  | fetchingUserAndUsers
  | addWeight
  | updateUser
  | weightsArrayUpdate;
