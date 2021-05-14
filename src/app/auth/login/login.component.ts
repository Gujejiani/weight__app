import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/profile/user.modal';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') formData: NgForm;
  message: string = '';
  invalidUser: boolean = false;
  loading: boolean = false;
  user: User;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authData) => {
      this.message = authData.errorMessage;
      this.loading = authData.loading;
    });
  }
  onSubmit() {
    const { email, password } = this.formData.value.form;

    this.store.dispatch(
      new AuthActions.LoginStart({ email: email, password: password })
    );
  }

  onClick() {
    if (this.message) {
      this.store.dispatch(new AuthActions.clearError());
    }
  }
}
