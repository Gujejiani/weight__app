import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import { AuthService } from './auth/auth.service';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weightApp';

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.autoLoginStart());
  }
}
