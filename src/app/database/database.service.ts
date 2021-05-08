import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../profile/user.modal';
import * as AuthActions from '../auth/store/auth.actions';
import * as UsersActions from '../dashboard/store/users.actions';
import { AppState } from '../store/app.reducer';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {}
  users: User[];
  token: string | boolean;
  loggedUser: User;

  getDataFromFirebase(
    token: string | boolean,
    email: string,
    onlyUsers: boolean = false,
    registeredUser?: User
  ) {
    this.token = token;

    this.http
      .get(
        'https://weight-app-d2c84-default-rtdb.firebaseio.com/users.json?auth=' +
          token
      )
      .pipe(
        map((res) => {
          if (!Array.isArray(res)) {
            //in case if firebase returns data with string property
            console.log(res);
            const users = [];
            for (let key in res) {
              users.push({ ...res[key][0] });
            }
            this.users = users;
            this.addMealWeightActivityArrays(users); // adding  empty [] in case if firebase gives activities, weight and meals undefined;

            return users;
          } else {
            console.log(res);
            console.log('ahahah');
            this.addMealWeightActivityArrays(res);
            return res;
          }
        })
      )
      .subscribe(
        (users: User[]) => {
          console.log(users);
          const loggedUser: User = users.find((user) => user.email === email);

          if (loggedUser) {
            console.log(loggedUser, '   logged User');
            loggedUser.token = token;
          }

          if (onlyUsers) {
            console.log('only users');
            this.store.dispatch(
              new UsersActions.fetchingOnlyUsers({ users: users })
            );
          } else {
            this.store.dispatch(
              new UsersActions.fetchingUserAndUsers({ users, loggedUser })
            );
            this.store.dispatch(new AuthActions.userLoggedIn(loggedUser));
            this.router.navigate(['/dashboard']);
            this.loggedUser = loggedUser;
            localStorage.setItem('userData', JSON.stringify(loggedUser));
          }
          if (registeredUser) {
            this.store.dispatch(
              new UsersActions.userRegistered({ user: registeredUser })
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateUsers() {
    this.store.select('data').subscribe((usersData) => {
      if (usersData.user) {
        localStorage.setItem('userData', JSON.stringify(usersData.user));
      }

      this.http
        .put(
          'https://weight-app-d2c84-default-rtdb.firebaseio.com/users.json?auth=' +
            this.token,
          usersData.users
        )
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  addMealWeightActivityArrays(users: User[]): void {
    console.log(users + ' users');
    users.forEach((user) => {
      user.weights ? (user.weights = user.weights) : (user.weights = []);
      user.meals ? (user.meals = user.meals) : (user.meals = []);
      user.activities
        ? (user.activities = user.activities)
        : (user.activities = []);
    });
  }
}
