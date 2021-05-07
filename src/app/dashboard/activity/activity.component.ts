import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/database/database.service';
import { CanComponentDeactivate } from 'src/app/shared/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { Activity } from './activity.modal';
import { ActivityService } from './activity.service';
import * as UserActions from '../store/users.actions';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, CanComponentDeactivate {
  showActivities: boolean = false;
  activity: Activity;
  activities: Activity[] = [];
  editMode: boolean = false;
  counter: number = 0;
  username: string;
  prevDesired: number = 0;
  @ViewChild('f') ngForm: NgForm;
  defaultOption = 'running';
  desiredActivityMode: boolean = false;
  changesSaved: boolean = true;
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.store
      .select('data')
      .pipe(map((userData) => userData.user))
      .subscribe((user) => {
        this.activities = user.activities;
        this.counter = this.activities.length;
        this.username = user.name;
        if (this.activatedRoute.snapshot.queryParams.desiredMode) {
          this.desiredActivityMode = true;
        } else {
          this.desiredActivityMode = false;
        }

        if (user.desired.activity > 0 && this.desiredActivityMode) {
          this.prevDesired = +user.desired.activity;
        }
      });
  }
  hideModal() {
    this.showActivities = false;
  }
  addDesiredActivityCl() {
    const desiredActivity = this.ngForm.value.calories;
    // this.userService.updateUser();
    this.store.dispatch(
      new UserActions.desiredActivityAdded({ desiredActivity: desiredActivity })
    );
    this.ngForm.reset();
    this.router.navigate(['/dashboard']);
    this.updateState();
  }

  onSubmit() {
    const activities: Activity[] = [...this.activities];
    const { type, calories, date } = this.ngForm.value;
    const id = this.activityService.generateUniqueID(this.activities);
    this.activity = new Activity(type, +calories, date, id);
    activities.push(this.activity);
    // this.activityService.addActivity(this.activity);
    // this.activities = this.userService.user.activities;
    this.dispatchActivities(activities);
    this.counter = this.activities.length;
    this.ngForm.reset();
  }
  onActivityClicked(activity: Activity) {
    this.showActivities = false;
    this.editMode = true;
    this.activity = { ...activity };
    this.ngForm.setValue({
      date: this.activity.date,
      type: this.activity.type,
      calories: this.activity.calories,
    });
    this.changesSaved = false;
  }
  updateActivity() {
    const activities: Activity[] = [...this.activities];
    this.activity.date = this.ngForm.value.date;
    this.activity.type = this.ngForm.value.type;
    this.activity.calories = this.ngForm.value.calories;
    const index = this.activities.findIndex(
      (activity) => activity.id === this.activity.id
    );
    activities[index] = this.activity;
    // this.activityService.updateActivity(this.activity.id, this.activity);
    this.dispatchActivities(activities);
    this.resetForm();
    this.router.navigate(['/dashboard']);
    this.changesSaved = true;
  }
  deleteActivity() {
    const activities: Activity[] = [...this.activities];
    const deletedIndex = activities.findIndex(
      (activity) => activity.id === this.activity.id
    );
    activities.splice(deletedIndex, 1);
    // this.activityService.deleteActivity(this.activity.id);
    this.dispatchActivities(activities);
    this.resetForm();
    this.changesSaved = true;
  }
  onActivityModal() {
    this.showActivities = true;
  }
  resetForm() {
    this.counter = this.activities.length;
    this.ngForm.reset();
    this.editMode = false;
  }

  dispatchActivities(activities: Activity[]) {
    this.store.dispatch(
      new UserActions.activitiesArrayUpdate({ activities: activities })
    );
    this.updateState();
  }
  updateState() {
    this.store.dispatch(new UserActions.updateUser());
    this.database.updateUsers();
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    }

    if (
      !this.changesSaved &&
      this.activity.calories !== this.ngForm.value.calories
    ) {
      return confirm('do you want to discard changes?');
    } else {
      return true;
    }
  }
}
