import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Weight } from './Weight.modal';
import * as UserActions from '../store/users.actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeightService {
  constructor(private store: Store<AppState>) {}

  addWeight(weightArr: Weight[], newWeight: Weight) {
    const updatedWeights: Weight[] = [...weightArr];
    updatedWeights.push(newWeight);
    this.dispatchWeights(updatedWeights);
  }
  updateWeights(weightArr: Weight[], newWeight: Weight, id: number) {
    const updatedWeights: Weight[] = [...weightArr];
    const index = updatedWeights.findIndex((weight) => weight.id === id);
    updatedWeights[index] = newWeight;
    this.dispatchWeights(updatedWeights);
  }

  deleteWeight(weightArr: Weight[], id: number) {
    const updatedWeights: Weight[] = [...weightArr];
    const deletedIndex = updatedWeights.findIndex((weight) => weight.id === id);
    updatedWeights.splice(deletedIndex, 1);
    this.dispatchWeights(updatedWeights);
  }

  dispatchWeights(weights: Weight[]) {
    this.store.dispatch(
      new UserActions.weightsArrayUpdate({ weights: weights })
    );
    this.updateState();
  }
  updateState() {
    this.store.dispatch(new UserActions.updateUser());
    this.store.dispatch(new UserActions.storeUsers());
  }

  addDesiredWeight(desiredWeight: number) {
    this.store.dispatch(
      new UserActions.desiredWeightAdded({ desiredWeight: desiredWeight })
    );
  }

  canDeactivate(saved: boolean, currentWeight: number, changedVal: number) {
    if (!saved && currentWeight !== changedVal) {
      return confirm('do you want to discard changes?');
    } else {
      return true;
    }
  }
}
