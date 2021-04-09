import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './profile/registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './profile/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeightComponent } from './dashboard/weight/weight.component';
import { MealsComponent } from './dashboard/meals/meals.component';
import { MealComponent } from './dashboard/meals/meal/meal.component';
import { WeightItemComponent } from './dashboard/weight/weight-item/weight-item.component';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { ActivityItemComponent } from './dashboard/activity/activity-item/activity-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    WelcomeComponent,
    DashboardComponent,
    WeightComponent,
    MealsComponent,
    MealComponent,
    WeightItemComponent,
    ActivityComponent,
    ActivityItemComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
