import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { Meal } from './meal.modal';
import { MealsService } from './meal.service';

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
    public mealService: MealsService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.mealService.restart();
    this.mealService.meals = this.userService.user.meals;
    this.meals = this.mealService.meals;
    this.username = this.userService.user.name;
    this.counter = this.meals.length;
    const desiredMode = this.activatedRoute.snapshot.queryParams.desiredMode;

    if (+this.userService.user.desired.meal > 0) {
      this.prevDesiredMeal = +this.userService.user.desired.meal;
    }
    if (desiredMode) {
      this.desiredMealMode = true;
    } else {
      false;
      this.prevDesiredMeal = 0;
    }
  }
  onSubmit() {
    const { meal, calories, date } = this.ngForm.value;
    // this.meal = new Meal(name: this.ng)
    this.meal = new Meal(
      meal,
      +calories,
      date,
      this.mealService.generateUniqueID(this.meals)
    );
    this.mealService.addMeal(this.meal);
    this.counter = this.mealService.meals.length;
    this.ngForm.reset();
    this.editMode = false;
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
    this.mealService.updateMeal(this.meal.id, this.meal);

    this.ngForm.reset();
    this.editMode = false;
    this.router.navigate(['dashboard']);
    this.changesSaved = true;
  }
  deleteMeal() {
    this.mealService.deleteMeal(this.meal.id);
    this.counter = this.mealService.meals.length;
    this.meals = this.mealService.meals;
    this.editMode = false;
    this.ngForm.reset();
  }
  saveDesiredMeal() {
    this.userService.user.desired.meal = this.ngForm.value.calories;
    this.userService.updateUser();
    this.ngForm.reset();
    this.router.navigate(['/dashboard']);
  }
  onMealClicked(meal: Meal) {
    this.ngForm.setValue({
      date: meal.date,
      meal: meal.name,
      calories: meal.calories,
    });
    this.meal = meal;
    this.hideModal();
    this.editMode = true;
    this.changesSaved = false;
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
