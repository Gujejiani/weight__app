import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MealsComponent } from './dashboard/meals/meals.component';
import { WeightComponent } from './dashboard/weight/weight.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './profile/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './profile/registration/registration.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: ProfileComponent },
  {
    path: 'dashboard/weight/:current',
    canActivate: [AuthGuard],
    component: WeightComponent,
  },
  {
    path: 'dashboard/weight',
    canActivate: [AuthGuard],
    component: WeightComponent,
  },
  {
    path: 'dashboard/meal',
    canActivate: [AuthGuard],
    component: MealsComponent,
  },

  {
    path: 'dashboard/activity',
    canActivate: [AuthGuard],
    component: ActivityComponent,
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
