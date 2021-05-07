import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { State } from '../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  subscription: Subscription;
  constructor(
    private store: Store<{ auth: State }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      auth.user ? (this.loggedIn = true) : (this.loggedIn = false);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
