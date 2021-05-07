import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Activity } from './activity.modal';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  public activities: Activity[] = [];
  constructor(public userService: UserService) {}
  updateActivities() {
    this.userService.user.activities = this.activities;
  }

  addActivity(activity: Activity) {
    this.activities.push(activity);

    this.updateActivities();
  }

  updateActivity(id: number, activity: Activity) {
    const activityIndex = this.activities.findIndex(
      (activity) => activity.id === id
    );
    this.activities[activityIndex] = activity;
    this.updateActivities();
  }
  deleteActivity(id: number) {
    const activityIndex = this.activities.findIndex((meal) => meal.id === id);
    this.activities.splice(activityIndex, 1);

    this.updateActivities();
  }
  getTodayTotalActivityCalories() {
    let total: number = 0;

    const todayDate = this.userService.getCurrentDate();
    this.activities.forEach((activity: Activity) => {
      if (String(activity.date) === todayDate) {
        total += +activity.calories;
      }
    });

    return total;
  }
  generateUniqueID(arr: Activity[]) {
    let id = 0;
    if (arr.length > 0) {
      id = Math.max(...arr.map((item) => item.id));
      id++;
    }
    return id;
  }
}
