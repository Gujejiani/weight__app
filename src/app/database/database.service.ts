import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../profile/user.modal';
import * as AuthActions from '../auth/store/auth.actions';
import * as UsersActions from '../dashboard/store/users.actions';
import { AppState } from '../store/app.reducer';
@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  users: User[];
  token: string;
  //save data to firebase
  saveDataToFirebase(user: User, token: string) {
    const users = [];
    users.push(user);

    console.log(users);

    this.http
      .post(
        'https://weight-app-d2c84-default-rtdb.firebaseio.com/users.json?auth=' +
          token,
        users
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log('err ', err);
        }
      );
  }

  getDataFromFirebase(token: string, email: string) {
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
            this.addMealWeightActivityArrays(users); // adding  empty [] in case if firebase gives activities, weight and meals without them;
            console.log(users);

            return users;
          } else {
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

          console.log(loggedUser, '   logged User');
          loggedUser.token = token;
          this.store.dispatch(
            new UsersActions.fetchingUserAndUsers({ users, loggedUser })
          );
          this.store.dispatch(new AuthActions.UserLoggedIn(loggedUser));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateUsers() {
    this.store.select('data').subscribe((usersData) => {
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
    users.forEach((user) => {
      user.weights ? (user.weights = user.weights) : (user.weights = []);
      user.meals ? (user.meals = user.meals) : (user.meals = []);
      user.activities
        ? (user.activities = user.activities)
        : (user.activities = []);
    });
  }
}
