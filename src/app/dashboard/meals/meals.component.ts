import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { Meal } from './meal.modal';
import * as UserActions from '../store/users.actions';
import { DatabaseService } from 'src/app/database/database.service';
@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('f') ngForm: NgForm;
  showMeals: boolean = false;
  meals: Meal[] = [];
  meal: Meal;
  username: string;
  counter: number = 0;
  editMode: boolean = false;
  desiredMealMode: boolean = false;
  prevDesiredMeal: number = 0;
  changesSaved: boolean = true;
  constructor(
    private userService: UserService,

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    // this.mealService.restart();
    this.store.select('data').subscribe((usersData) => {
      // this.mealService.meals = this.userService.user.meals;
      this.meals = usersData.user.meals;
      this.username = usersData.user.name;
      this.counter = this.meals.length;
      const desiredMode = this.activatedRoute.snapshot.queryParams.desiredMode;

      if (+usersData.user.desired.meal > 0) {
        this.prevDesiredMeal = +usersData.user.desired.meal;
      }
      if (desiredMode) {
        this.desiredMealMode = true;
      } else {
        false;
        this.prevDesiredMeal = 0;
      }
    });
  }
  onSubmit() {
    const meals: Meal[] = [...this.meals];
    const { meal, calories, date } = this.ngForm.value;
    // this.meal = new Meal(name: this.ng)
    this.meal = new Meal(
      meal,
      +calories,
      date,
      this.userService.generateUniqueID(this.meals)
    );
    meals.push(this.meal);
    this.dispatchMeals(meals);
    this.counter = this.meals.length;
    this.resetForm();
  }
  onMealModal() {
    this.showMeals = !this.showMeals;
  }
  hideModal() {
    this.showMeals = false;
  }

  updateMeal() {
    const meals: Meal[] = [...this.meals];
    this.meal.date = this.ngForm.value.date;
    this.meal.name = this.ngForm.value.meal;
    this.meal.calories = this.ngForm.value.calories;
    const index = meals.findIndex((meal) => meal.id === this.meal.id);
    meals[index] = this.meal;
    // this.mealService.updateMeal(this.meal.id, this.meal);
    this.dispatchMeals(meals);
    this.resetForm();
    this.router.navigate(['dashboard']);
    this.changesSaved = true;
  }
  resetForm() {
    this.ngForm.reset();
    this.editMode = false;
  }

  deleteMeal() {
    const meals: Meal[] = [...this.meals];
    const deletedMealIndex = meals.findIndex(
      (meal) => meal.id === this.meal.id
    );
    meals.splice(deletedMealIndex, 1);
    this.dispatchMeals(meals);
    this.resetForm();
    this.counter = this.meals.length;
  }
  saveDesiredMeal() {
    // this.userService.user.desired.meal = this.ngForm.value.calories;
    // this.userService.updateUser();
    const desiredMeal = this.ngForm.value.calories;
    this.store.dispatch(
      new UserActions.desiredMealAdded({ desiredMeal: desiredMeal })
    );
    this.updateState();
    this.ngForm.reset();
    this.router.navigate(['/dashboard']);
  }
  onMealClicked(meal: Meal) {
    this.ngForm.setValue({
      date: meal.date,
      meal: meal.name,
      calories: meal.calories,
    });
    this.meal = { ...meal };
    this.hideModal();
    this.editMode = true;
    this.changesSaved = false;
  }

  dispatchMeals(meals: Meal[]) {
    this.store.dispatch(new UserActions.mealsArrayUpdate({ meals: meals }));
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
      this.meal.calories !== this.ngForm.value.calories
    ) {
      return confirm('do you want to discard changes?');
    } else {
      return true;
    }
  }
}
