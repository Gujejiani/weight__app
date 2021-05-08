import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatabaseService } from 'src/app/database/database.service';
import { User } from '../../profile/user.modal';
import { AuthService } from '../auth.service';
import { State } from '../store/auth.reducer';
import * as UserActions from '../../dashboard/store/users.actions';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild('form') ngForm: NgForm;
  @ViewChild('password') password: ElementRef;
  userEmail: string = 'sa';
  user: User;
  purpose: string = 'gain';
  passwordConfirmed: boolean = false;
  userAlreadyRegistered: boolean = false;
  loading: boolean = false;
  confirmingPassword(e) {
    if (e.target.value === this.ngForm.value.formData.password) {
      this.passwordConfirmed = true;
    } else {
      this.passwordConfirmed = false;
    }
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private database: DatabaseService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {}
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
      this.auth.signUp(this.user).subscribe(
        // getting all registered users
        (resData) => {
          this.userAlreadyRegistered = false;
          this.router.navigate(['/login']);
          this.loading = false;
          this.database.getDataFromFirebase(
            resData.idToken,
            resData.email,
            true,
            this.user
          );
          this.database.updateUsers(); //sending registered user
          // this.database.saveDataToFirebase(this.user, resData.idToken);
        },
        (err) => {
          this.userAlreadyRegistered = true;
          this.userEmail = form.email;
          this.loading = false;
        }
      );
      // if (this.registrationService.getUserData(this.user.email)) {
      //   console.log('user already exits');
      //   this.userAlreadyRegistered = true;
      //   this.userEmail = form.email;
      // } else {
      //   this.registrationService.userRegistered(this.user);
      //   this.userAlreadyRegistered = false;
      //   this.router.navigate(['/login']);
      // }
    }
  }
}
