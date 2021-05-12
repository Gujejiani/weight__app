import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/profile/user.modal';

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
  dates: string[] = [];
  @Input() user: User;
  histories: History[] = [];
  history: History = {};
  desiredWeight: number;
  desiredActivity: number;
  desiredMeal: number;
  wantsToGainWeight: boolean;

  @Input() showHistory: boolean;

  sortByDate() {
    this.histories.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  sortByWeight() {
    this.histories.sort((a, b) => {
      let num1: number = a.weight || 0;
      let num2: number = b.weight || 0;

      if (+num1 > +num2) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  sortByMeal() {
    this.histories.sort((a, b) => {
      let num1: number = a.meals || 0;
      let num2: number = b.meals || 0;
      if (num1 > num2) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  sortByActivity() {
    this.histories.sort((a, b) => {
      let num1: number = a.activity || 0;
      let num2: number = b.activity || 0;
      if (num1 > num2) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  ngOnInit(): void {
    if (!this.user) return;

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

  getHistoryDataForMealAndActivity(history: History, data, type: string) {
    const dataType = data.find((item) => String(item.date) === history.date);

    const inputs = data.filter((item) => item?.date === dataType?.date);

    let totalData = 0;

    inputs.forEach((el) => {
      totalData += +el.calories;
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
    this.desiredWeight = this.user.desired?.weight || 0;
    this.desiredActivity = this.user.desired?.activity || 0;
    this.desiredMeal = this.user.desired?.meal || 0;

    if (this.user.purpose === 'gain') {
      this.wantsToGainWeight = true;
    } else {
      this.wantsToGainWeight = false;
    }
  }
}
