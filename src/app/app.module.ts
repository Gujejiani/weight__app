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

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    WelcomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
