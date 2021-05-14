import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Activity } from './activity.modal';
import * as UserActions from '../store/users.actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(private store: Store<AppState>) {}

  addActivity(activityArr: Activity[], newActivity: Activity) {
    const updatedActivities: Activity[] = [...activityArr];
    updatedActivities.push(newActivity);
    this.dispatchActivities(updatedActivities);
  }
  updateActivities(activityArr: Activity[], newActivity: Activity, id: number) {
    const updatedActivities: Activity[] = [...activityArr];
    const index = updatedActivities.findIndex((activity) => activity.id === id);
    updatedActivities[index] = newActivity;
    this.dispatchActivities(updatedActivities);
  }

  deleteActivity(activityArr: Activity[], id: number) {
    const updatedActivities: Activity[] = [...activityArr];
    const deletedIndex = updatedActivities.findIndex(
      (activity) => activity.id === id
    );
    updatedActivities.splice(deletedIndex, 1);
    this.dispatchActivities(updatedActivities);
  }

  dispatchActivities(activities: Activity[]) {
    this.store.dispatch(
      new UserActions.activitiesArrayUpdate({ activities: activities })
    );
    this.updateState();
  }
  updateState() {
    this.store.dispatch(new UserActions.updateUser());
    this.store.dispatch(new UserActions.storeUsers());
  }

  addDesiredActivity(desiredActivity: number) {
    this.store.dispatch(
      new UserActions.desiredActivityAdded({ desiredActivity: desiredActivity })
    );
  }

  canDeactivate(saved: boolean, currentActivity: number, changedVal: number) {
    if (!saved && currentActivity !== changedVal) {
      return confirm('do you want to discard changes?');
    } else {
      return true;
    }
  }
}
