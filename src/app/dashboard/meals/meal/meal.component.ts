import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Meal } from '../meal.modal';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  constructor() {}
  @Input() meals: Meal[];
  @Input() showModal: boolean;
  @Output() mealClicked = new EventEmitter<Meal>();
  ngOnInit(): void {}
  onMealClicked(meal: Meal) {
    this.mealClicked.emit(meal);
  }
}
