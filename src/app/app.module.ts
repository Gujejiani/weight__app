import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { CanDeactivateGuard } from './shared/saved-guard/saved-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { authReducer } from './auth/store/auth.reducer';
import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    SharedModule,
  ],
  providers: [AuthGuard, CanDeactivateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
