import { Component, OnInit, EventEmitter } from '@angular/core';

import { LoginService } from '../shared/login.service';
import { UserService } from '../shared/user.service';
import { ActivityService } from './activity/activity.service';
import { MealsService } from './meals/meal.service';
import { Weight } from './weight/weight.modal';
import { WeightService } from './weight/weight.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: string;
  loggedIn: boolean = false;
  dashboard: boolean = false;
  currentWeight: number = 0;
  desiredWeight: number = 0;
  wantsToGainWeight: boolean = false;
  weightMessage: string;
  changeDesiredMode = new EventEmitter<void>();
  todayTotalMeal: number = 0;
  desiredMeal: number = 0;
  mealMessage: string;
  todayTotalActivity: number = 0;
  desiredActivity: number = 0;
  activityMessage: string;

  date: string;
  showUserHistory: boolean = false;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private weightService: WeightService,
    private mealService: MealsService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.loginService.loggedIn) {
        this.user = this.userService?.user.name;
        this.loggedIn = true;
        if (this.userService.user.desired?.weight) {
          this.desiredWeight = this.userService.user.desired?.weight;

          this.generateWeightMessage();
        }

        this.mealService.meals = this.userService.user.meals;
        this.activityService.activities = this.userService.user.activities;
        this.todayTotalMeal = this.mealService.getTodayTotalMealCalories();
        this.todayTotalActivity = this.activityService.getTodayTotalActivityCalories();

        this.date = this.userService.getCurrentDate();
      }
      if (this.userService.user.desired.meal) {
        this.desiredMeal = this.userService.user.desired.meal;
        this.generateMealMessage();
      } else {
        this.mealMessage = 'please enter your desired activity calories';
      }
      if (this.userService.user.desired.activity) {
        this.desiredActivity = this.userService.user.desired.activity;
        this.generateActivityMessage();
      } else {
        this.activityMessage = 'please enter your desired activity calories';
      }
    }, 200);
    this.addDesiredWeight();
  }

  addDesiredWeight() {
    if (!this.userService.user) return;
    const match: Weight = this.userService.user.weights.find((item) => {
      return this.userService.getCurrentDate() === String(item.date);
    });

    if (match) {
      this.currentWeight = +match.weight;
    } else {
      this.currentWeight = 0;
    }

    if (this.userService.user.purpose === 'gain') {
      this.wantsToGainWeight = true;
    } else {
      this.wantsToGainWeight = false;
    }
  }
  onHistoryToggle() {
    this.showUserHistory = !this.showUserHistory;
  }
  generateMealMessage() {
    this.mealMessage = this.weightService.generateMessage(
      +this.todayTotalMeal,
      +this.desiredMeal,
      this.wantsToGainWeight,
      this.user,
      'cl',
      'calories'
    );
  }
  generateActivityMessage() {
    this.activityMessage = this.weightService.generateMessage(
      +this.todayTotalActivity,
      +this.desiredActivity,
      this.wantsToGainWeight,
      this.user,
      'cl',
      'calories'
    );
  }
  generateWeightMessage() {
    this.weightMessage = this.weightService.generateMessage(
      this.currentWeight,
      this.desiredWeight,
      this.wantsToGainWeight,
      this.user,
      'kg',
      'weight'
    );
  }
}
