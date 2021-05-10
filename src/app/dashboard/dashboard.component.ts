import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../shared/user.service';
import { Weight } from './weight/weight.modal';
import { User } from '../profile/user.modal';
import { AppState } from '../store/app.reducer';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: User = null;
  loggedIn: boolean = false;
  dashboard: boolean = false;
  currentWeight: number = 0;
  desiredWeight: number = 0;
  wantsToGainWeight: boolean = false;
  weightMessage: string;
  todayTotalMeal: number = 0;
  desiredMeal: number = 0;
  mealMessage: string;
  todayTotalActivity: number = 0;
  desiredActivity: number = 0;
  activityMessage: string;
  date: string;
  showUserHistory: boolean = false;
  constructor(
    private userService: UserService,

    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    console.log('dashboard');
    this.store.select('data').subscribe((authData) => {
      this.user = authData.user;
    });
    if (this.user) {
      this.todayTotalMeal = this.userService.getTodayTotalCalories(
        this.user.meals,
        null
      );
      this.todayTotalActivity = this.userService.getTodayTotalCalories(
        this.user.activities,
        null
      );
      this.date = this.userService.getCurrentDate();
    }

    this.addDesiredWeight();
    this.generateMessages();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loggedIn = true;
    }, 0);
  }

  generateMessages() {
    if (this.user.desired?.weight) {
      this.desiredWeight = this.user.desired?.weight;
      this.generateWeightMessage();
    } else {
      this.weightMessage = ' please enter your desired weight';
    }
    if (this.user.desired?.meal) {
      this.desiredMeal = this.user.desired.meal;
      this.generateMealMessage();
    } else {
      this.mealMessage = 'please enter your desired activity calories';
    }
    if (this.user?.desired.activity) {
      this.desiredActivity = this.user.desired.activity;
      this.generateActivityMessage();
    } else {
      this.activityMessage = 'please enter your desired activity calories';
    }
  }
  addDesiredWeight() {
    if (!this.user) return;
    const match: Weight = this.user.weights.find((item) => {
      return this.userService.getCurrentDate() === String(item.date);
    });

    if (match) {
      this.currentWeight = +match.weight;
    } else {
      this.currentWeight = 0;
    }

    if (this.user.purpose === 'gain') {
      this.wantsToGainWeight = true;
    } else {
      this.wantsToGainWeight = false;
    }
  }
  onHistoryToggle() {
    this.showUserHistory = !this.showUserHistory;
    this.loggedIn = true;
  }
  generateMealMessage() {
    this.mealMessage = this.userService.generateMessage(
      +this.todayTotalMeal,
      +this.desiredMeal,
      this.wantsToGainWeight,
      this.user.name,
      'cl',
      'calories'
    );
  }
  generateActivityMessage() {
    this.activityMessage = this.userService.generateMessage(
      +this.todayTotalActivity,
      +this.desiredActivity,
      this.wantsToGainWeight,
      this.user.name,
      'cl',
      'calories'
    );
  }

  generateWeightMessage() {
    this.weightMessage = this.userService.generateMessage(
      +this.currentWeight,
      +this.desiredWeight,
      this.wantsToGainWeight,
      this.user.name,
      'kg',
      'weight'
    );
  }
}
