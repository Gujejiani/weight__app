import { Injectable } from '@angular/core';
import { Activity } from '../dashboard/activity/activity.modal';
import { Meal } from '../dashboard/meals/meal.modal';
import { Weight } from '../dashboard/weight/weight.modal';
import { User } from '../profile/user.modal';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user: User;

  generateUniqueID(arr: Meal[] | Weight[] | Activity[] = []): number {
    let id = 0;
    if (arr.length > 0) {
      id = Math.max(
        ...(arr as Array<Meal | Weight | Activity>).map(
          (item: Meal | Weight | Activity) => item.id
        )
      );
      id++;
    }
    return id;
  }

  getTodayTotalCalories(val: Meal[] | Activity[], givenDate?) {
    let total: number = 0;
    const todayDate = !givenDate ? this.getCurrentDate() : givenDate;

    val.forEach((el) => {
      if (String(el.date) === todayDate) {
        total += +el.calories;
      }
    });
    return total;
  }

  getCurrentDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    let Today = year + '-' + month + '-' + day;
    return Today;
  }

  //generates message for weight, meal and activity
  generateMessage(
    current: number,
    desired: number,
    wantsToGainWeight: boolean,
    user: string,
    unit: string,
    unitName: string
  ) {
    let message;
    if (desired > current && wantsToGainWeight) {
      message = `${
        desired - current
      } ${unit} left to your desired ${unitName}, continue good
            Work ${this.capitalizeFirstLetter(user)}!`;
    }
    if (current > desired && wantsToGainWeight) {
      message = `${this.capitalizeFirstLetter(
        this.capitalizeFirstLetter(user)
      )} congratulation You have reached your desired ${unitName} + ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    if (current > desired && !wantsToGainWeight) {
      message = ` you need to lose ${
        current - desired
      } ${unit} for your desired ${unitName}, continue good
            Work ${this.capitalizeFirstLetter(user)}!`;
    }
    if (current < desired && !wantsToGainWeight) {
      message = `${this.capitalizeFirstLetter(
        user
      )} congratulation Your desired daily ${unitName} are lower than your daily ${unitName}  - ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    if (current === desired) {
      message = ` Congratulation for your great work  ${this.capitalizeFirstLetter(
        user
      )}!`;
    }

    return message;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
