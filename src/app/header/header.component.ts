import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { State } from '../auth/store/auth.reducer';

import * as AuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  subscription: Subscription;
  constructor(private store: Store<{ auth: State }>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('auth').subscribe((auth) => {
      auth.user ? (this.loggedIn = true) : (this.loggedIn = false);
    });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.userLogOut());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
