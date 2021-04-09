import { Activity } from '../dashboard/activity/activity.modal';
import { Meal } from '../dashboard/meals/meal.modal';
import { Weight } from '../dashboard/weight/weight.modal';

interface Data {
  weights: Weight[];
  meals: Meal[];
  activities: Activity[];
}
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public weights: Weight[],
    public meals: Meal[],
    public activities: Activity[],
    public desired: {
      weight: number;
      meal: number;
      activity: number;
    },
    public purpose: string,
    public token: boolean
  ) {}
}
