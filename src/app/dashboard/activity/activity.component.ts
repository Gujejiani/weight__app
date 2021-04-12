import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { Activity } from './activity.modal';
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
  @ViewChild('f') ngForm: NgForm;
  defaultOption = 'running';
  desiredActivityMode: boolean = false;
  changesSaved: boolean = true;
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activityService.activities = this.userService.user.activities;

    this.activities = this.activityService.activities;
    this.counter = this.activities.length;
    this.username = this.userService.user.name;

    if (this.activatedRoute.snapshot.queryParams.desiredMode) {
      this.desiredActivityMode = true;
    } else {
      this.desiredActivityMode = false;
    }

    if (
      this.userService.user.desired.activity > 0 &&
      this.desiredActivityMode
    ) {
      this.prevDesired = +this.userService.user.desired.activity;
    }
  }
  hideModal() {
    this.showActivities = false;
  }
  addDesiredActivityCl() {
    this.userService.user.desired.activity = this.ngForm.value.calories;
    this.userService.updateUser();
    this.ngForm.reset();
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    const { type, calories, date } = this.ngForm.value;
    this.activity = new Activity(
      type,
      +calories,
      date,
      this.activityService.generateUniqueID(this.activities)
    );
    this.activityService.addActivity(this.activity);
    // this.activities = this.userService.user.activities;
    this.counter = this.activityService.activities.length;
    this.ngForm.reset();
  }
  onActivityClicked(activity: Activity) {
    this.showActivities = false;
    this.editMode = true;
    this.activity = activity;
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
    this.activityService.updateActivity(this.activity.id, this.activity);
    this.ngForm.reset();
    this.editMode = false;

    this.router.navigate(['/dashboard']);
    this.changesSaved = true;
  }
  deleteActivity() {
    this.activityService.deleteActivity(this.activity.id);
    this.counter = this.activities.length;
    this.ngForm.reset();
    this.editMode = false;
    this.changesSaved = true;
  }
  onActivityModal() {
    this.showActivities = true;
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
