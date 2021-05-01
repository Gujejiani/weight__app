import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivityItemComponent } from '../dashboard/activity/activity-item/activity-item.component';
import { ActivityComponent } from '../dashboard/activity/activity.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HistoryComponent } from '../dashboard/history/history.component';
import { MealComponent } from '../dashboard/meals/meal/meal.component';
import { MealsComponent } from '../dashboard/meals/meals.component';
import { WeightItemComponent } from '../dashboard/weight/weight-item/weight-item.component';
import { WeightComponent } from '../dashboard/weight/weight.component';
import { AuthGuard } from '../shared/auth-guard/auth-guard.service';
import { ProfileComponent } from './profile.component';

const route = [
  { path: '', canActivate: [AuthGuard], component: ProfileComponent },
];

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    HistoryComponent,
    ActivityComponent,
    ActivityItemComponent,
    MealsComponent,
    MealComponent,
    WeightComponent,
    WeightItemComponent,
  ],
  imports: [RouterModule.forChild(route), CommonModule, FormsModule],
})
export class ProfileModule {}
