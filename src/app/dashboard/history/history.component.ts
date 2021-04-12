import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/profile/user.modal';
import { UserService } from 'src/app/shared/user.service';
import { MealsService } from '../meals/meal.service';
interface History {
  date?: string;
  weight?: number;
  meals?: number;
  activity?: number;
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private userService: UserService,
    private mealService: MealsService
  ) {}
  dates: string[] = [];
  user: User;
  histories: History[] = [];
  history: History = {};

  desiredWeight: number;
  desiredActivity: number;
  desiredMeal: number;
  wantsToGainWeight: boolean;

  @Input() showHistory: boolean;

  ngOnInit(): void {
    this.user = this.userService.user;
    this.getDates(this.user.activities);
    this.getDates(this.user.weights);
    this.getDates(this.user.meals);
    this.addDatesToHistory();
    this.getDesiredInputs();
    this.addDataToHistory();
  }

  getDates(arr) {
    arr.forEach((item) => {
      if (!this.dates.includes(item.date)) {
        this.dates.push(item.date);
      }
    });
  }
  addDatesToHistory() {
    this.dates.forEach((date: string) => {
      this.history.date = date;

      this.histories.push({ ...this.history });
    });
  }

  addDataToHistory() {
    this.histories.forEach((history) => {
      const weight = this.user.weights.find(
        (item) => String(item.date) === history.date
      );

      history.weight = +weight?.weight || 0;
    });

    this.histories.forEach((history) => {
      this.getHistoryDataForMealAndActivity(history, this.user.meals, 'meal');
      this.getHistoryDataForMealAndActivity(
        history,
        this.user.activities,
        'activity'
      );
    });
  }

  getHistoryDataForMealAndActivity(history, data, type) {
    const dataType = data.find((item) => String(item.date) === history.date);

    const inputs = data.filter((item) => item?.date === dataType?.date);
    let totalData = 0;
    inputs.forEach((el) => {
      const history: History = this.histories.find(
        (history) => String(history.date) === String(dataType?.date)
      );
      if (type === 'activity') {
        history.activity = totalData;
      }
      if (type === 'meal') {
        history.meals = totalData;
      }
    });
  }

  styleDataOnGainOrLoseWeight(input, desiredInput) {
    if (this.wantsToGainWeight) {
      if (input === 0) {
        return '#fff';
      }
      if (input >= desiredInput && input > 0) {
        return '#16df0f';
      }
      if (input < desiredInput && input > 0) {
        return '#d3290b';
      }
    }
    if (!this.wantsToGainWeight) {
      if (input === 0) {
        return '#fff';
      }
      if (input <= desiredInput && input > 0) {
        return '#16df0f';
      }
      if (input > desiredInput && input > 0) {
        return '#d3290b';
      }
    }
  }

  getDesiredInputs() {
    this.desiredWeight = this.userService.user.desired?.weight || 0;
    this.desiredActivity = this.userService.user.desired?.activity || 0;
    this.desiredMeal = this.userService.user.desired?.meal || 0;

    if (this.userService.user.purpose === 'gain') {
      this.wantsToGainWeight = true;
    } else {
      this.wantsToGainWeight = false;
    }
  }
}