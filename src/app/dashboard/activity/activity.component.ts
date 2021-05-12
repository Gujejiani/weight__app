import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/auth/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { Activity } from './activity.modal';
import { map } from 'rxjs/operators';
import { ActivityService } from './activity.service';
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
  desiredActivity;
  @ViewChild('f') ngForm: NgForm;
  defaultOption = 'running';
  desiredActivityMode: boolean = false;
  changesSaved: boolean = true;
  constructor(
    private userService: UserService,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.store
      .select('data')
      .pipe(map((userData) => userData.user))
      .subscribe((user) => {
        if (!user) return;
        this.activities = user.activities;
        this.counter = this.activities.length;
        this.username = user.name;
        this.desiredActivity = user.desired.activity;
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
    this.activityService.addDesiredActivity(+desiredActivity);
    this.ngForm.reset();
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    const { type, calories, date } = this.ngForm.value;
    const id = this.userService.generateUniqueID(this.activities);
    this.activity = new Activity(type, +calories, date, id);
    this.activityService.addActivity(this.activities, this.activity);
    this.resetForm();
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
    this.activity.date = this.ngForm.value.date;
    this.activity.type = this.ngForm.value.type;
    this.activity.calories = this.ngForm.value.calories;
    this.activityService.updateActivities(
      this.activities,
      this.activity,
      +this.activity.id
    );
    this.resetForm();
    this.router.navigate(['/dashboard']);
    this.changesSaved = true;
  }
  deleteActivity() {
    this.activityService.deleteActivity(this.activities, +this.activity.id);

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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    }
    return this.activityService.canDeactivate(
      this.changesSaved,
      +this.activity.calories,
      +this.ngForm.value.calories
    );
  }
}
