import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { State } from '../auth/store/auth.reducer';

import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  subscription: Subscription;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store<{ auth: State }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.loggedIn = this.loginService.loggedIn;
    // this.subscription = this.loginService.userLoggedIn.subscribe(
    //   (loggedIn: boolean) => {
    //     this.loggedIn = loggedIn;
    //   }
    // );
    this.store.select('auth').subscribe((auth) => {
      auth.user ? (this.loggedIn = true) : (this.loggedIn = false);
    });
  }

  onLogout() {
    // this.loggedIn = false;
    // this.loginService.logOut();
    // this.router.navigate(['']);
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
