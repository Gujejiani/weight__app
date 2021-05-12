import { Store } from '@ngrx/store';
import { DatabaseService } from 'src/app/database/database.service';
import { AppState } from 'src/app/store/app.reducer';
import { Meal } from './Meal.modal';
import * as UserActions from '../store/users.actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MealService {
  constructor(
    private store: Store<AppState>,
    private database: DatabaseService
  ) {}

  addMeal(MealArr: Meal[], newMeal: Meal) {
    const updatedMeals: Meal[] = [...MealArr];
    updatedMeals.push(newMeal);
    this.dispatchMeals(updatedMeals);
  }
  updateMeals(MealArr: Meal[], newMeal: Meal, id: number) {
    const updatedMeals: Meal[] = [...MealArr];
    const index = updatedMeals.findIndex((Meal) => Meal.id === id);
    updatedMeals[index] = newMeal;
    this.dispatchMeals(updatedMeals);
  }

  deleteMeal(MealArr: Meal[], id: number) {
    const updatedMeals: Meal[] = [...MealArr];
    const deletedIndex = updatedMeals.findIndex((Meal) => Meal.id === id);
    updatedMeals.splice(deletedIndex, 1);
    this.dispatchMeals(updatedMeals);
  }

  dispatchMeals(meals: Meal[]) {
    this.store.dispatch(new UserActions.mealsArrayUpdate({ meals: meals }));
    this.updateState();
  }
  updateState() {
    this.store.dispatch(new UserActions.updateUser());
    this.database.updateUsers();
  }

  addDesiredMeal(desiredMeal: number) {
    this.store.dispatch(
      new UserActions.desiredMealAdded({ desiredMeal: desiredMeal })
    );
  }

  canDeactivate(saved: boolean, currentMeal: number, changedVal: number) {
    if (!saved && currentMeal !== changedVal) {
      return confirm('do you want to discard changes?');
    } else {
      return true;
    }
  }
}
