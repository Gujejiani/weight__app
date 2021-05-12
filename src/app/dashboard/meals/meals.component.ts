import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/auth/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { Meal } from './meal.modal';
import { MealService } from './meal.service';
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
  desiredMeal = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.store.select('data').subscribe((usersData) => {
      if (!usersData.user) return;
      this.meals = usersData.user.meals;
      this.username = usersData.user.name;
      this.desiredMeal = usersData.user.desired.meal || 0;
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
    const { meal, calories, date } = this.ngForm.value;
    this.meal = new Meal(
      meal,
      +calories,
      date,
      this.userService.generateUniqueID(this.meals)
    );
    this.mealService.addMeal(this.meals, this.meal);
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
    this.meal.date = this.ngForm.value.date;
    this.meal.name = this.ngForm.value.meal;
    this.meal.calories = this.ngForm.value.calories;
    this.mealService.updateMeals(this.meals, this.meal, +this.meal.id);
    this.resetForm();
    this.router.navigate(['dashboard']);
    this.changesSaved = true;
  }
  resetForm() {
    this.ngForm.reset();
    this.editMode = false;
  }

  deleteMeal() {
    this.mealService.deleteMeal(this.meals, +this.meal.id);
    this.resetForm();
    this.counter = this.meals.length;
    this.changesSaved = true;
  }
  saveDesiredMeal() {
    const desiredMeal = +this.ngForm.value.calories;
    this.mealService.addDesiredMeal(desiredMeal);
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    }
    return this.mealService.canDeactivate(
      this.changesSaved,
      +this.meal.calories,
      +this.ngForm.value.calories
    );
  }
}
