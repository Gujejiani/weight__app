import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './profile/login/login.component';
import { RegistrationComponent } from './profile/registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
