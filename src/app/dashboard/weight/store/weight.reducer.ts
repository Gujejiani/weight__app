import { Weight } from '../weight.modal';
import * as ActionTypes from './weight.actions';
export interface State {
  weights: Weight[];
  desiredWeight: number;
}
const initialState: State = {
  weights: [],
  desiredWeight: 0,
};

export function weightReducer(state: State = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
