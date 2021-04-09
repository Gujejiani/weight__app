import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Activity } from '../dashboard/activity/activity.modal';
import { Meal } from '../dashboard/meals/meal.modal';
import { Weight } from '../dashboard/weight/weight.modal';
import { User } from '../profile/user.modal';
import { RegistrationService } from './registration.service';
@Injectable({ providedIn: 'root' })
export class UserService {
  changeDesiredWeight = new Subject<void>();

  public user: User;
  constructor(private registrationService: RegistrationService) {}

  addWeight(weight: Weight) {
    if (this.user) {
      this.user?.weights.push(weight);
      this.updateUser();
    }
  }
  deleteWeight(date: Date) {
    const index = this.user?.weights.findIndex((user) => user.date === date);
    this.user?.weights.splice(index, 1);
    this.updateUser();
  }
  updateWeight(id: number, newWeight: Weight) {
    this.registrationService.updateUsersData(this.user.email, this.user);
    console.log(this.user.weights);
  }

  updateUser() {
    console.log(this.user);
    this.registrationService.updateUsersData(this.user.email, this.user);
  }

  addMeals(meal: Meal) {}
  addActivities(activity: Activity) {}

  userLoggedIn(user: User) {
    this.user = user;
    this.user.token = true;
    this.updateUser();
  }
  userLogOut() {
    this.user.token = false;
    this.updateUser();
  }
  generateUniqueID(arr: Weight[]) {
    let id = 0;
    if (arr.length > 0) {
      id = Math.max(...arr.map((item) => item.id));
      id++;
    }
    return id;
  }

  getCurrentDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    let Today = year + '-' + month + '-' + day;
    return Today;
  }
}
