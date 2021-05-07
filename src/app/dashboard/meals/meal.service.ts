import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Meal } from './meal.modal';

@Injectable({ providedIn: 'root' })
export class MealsService {
  public meals: Meal[] = [];

  constructor(public userService: UserService) {}

  // updateMeals() {
  //   this.userService.user.meals = this.meals;
  //   this.userService.updateUser();
  // }

  // addMeal(meal: Meal) {
  //   this.meals.push(meal);
  //   this.updateMeals();
  // }

  // updateMeal(id: number, meal: Meal) {
  //   const mealIndex = this.meals.findIndex((meal) => meal.id === id);
  //   this.meals[mealIndex] = meal;
  //   this.updateMeals();
  // // }
  // deleteMeal(id: number) {
  //   const mealIndex = this.meals.findIndex((meal) => meal.id === id);
  //   this.meals.splice(mealIndex, 1);
  //   this.updateMeals();
  // }

  getTodayTotalMealCalories(givenDate?) {
    let total: number = 0;

    const todayDate = !givenDate
      ? this.userService.getCurrentDate()
      : givenDate;

    this.meals.forEach((meal) => {
      if (String(meal.date) === todayDate) {
        total += +meal.calories;
      }
    });
    return total;
  }

  generateUniqueID(arr: Meal[]) {
    let id = 0;
    if (arr.length > 0) {
      id = Math.max(...arr.map((item) => item.id));
      id++;
    }
    return id;
  }
}
