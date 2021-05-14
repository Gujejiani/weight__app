import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../profile/user.modal';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('form') ngForm: NgForm;
  @ViewChild('password') password: ElementRef;
  userEmail: string = '';
  user: User;
  purpose: string = 'gain';
  passwordConfirmed: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  storeSubscription: Subscription;
  confirmingPassword(e) {
    if (e.target.value === this.ngForm.value.formData.password) {
      this.passwordConfirmed = true;
    } else {
      this.passwordConfirmed = false;
    }
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe((authData) => {
      this.errorMessage = authData.errorMessage;
      this.loading = authData.loading;
    });
  }
  onSubmit() {
    this.loading = true;
    console.log(this.ngForm.value.formData);
    const form: {
      name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      purpose: string;
    } = this.ngForm.value.formData;
    if (form.password === form.confirmPassword) {
      this.user = new User(
        form.username,
        form.email,
        form.password,
        [],
        [],
        [],

        {
          weight: 0,
          meal: 0,
          activity: 0,
        },
        form.purpose,
        false
      );

      this.store.dispatch(new AuthActions.registrationStart(this.user));
    }
  }
  checkError() {
    if (this.errorMessage) {
      this.store.dispatch(new AuthActions.clearError());
    }
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
