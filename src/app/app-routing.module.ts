import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { MealsComponent } from './dashboard/meals/meals.component';
import { WeightComponent } from './dashboard/weight/weight.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { CanDeactivateGuard } from './shared/saved-guard/saved-guard.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoggedInGuard } from './shared/auth-guard/logged-in.guard';
const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [LoggedInGuard] },

  {
    path: 'registration',
    loadChildren: () =>
      import('./auth/registration/registration.module').then(
        (m) => m.registrationModule
      ),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.loginModule),
    canActivate: [LoggedInGuard],
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'dashboard/weight/:current',
    canActivate: [AuthGuard],
    component: WeightComponent,
    canDeactivate: [CanDeactivateGuard],
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
    canDeactivate: [CanDeactivateGuard],
  },

  {
    path: 'dashboard/activity',
    canActivate: [AuthGuard],
    component: ActivityComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
