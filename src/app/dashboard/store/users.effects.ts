import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { User } from 'src/app/profile/user.modal';
import * as AuthActions from '../../auth/store/auth.actions';
import * as UsersActions from './users.actions';
import * as UsersActionTypes from './actionTypes';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
const addMealWeightActivityArrays = (users: User[]): User[] => {
  users.forEach((user) => {
    if (!user) {
      let index = users.findIndex((user) => user === null);
      users.splice(index, 1);
      return; // in case if I delete data from firebase and some returned el is null
    }
    user.weights ? (user.weights = user.weights) : (user.weights = []);
    user.meals ? (user.meals = user.meals) : (user.meals = []);
    user.activities
      ? (user.activities = user.activities)
      : (user.activities = []);
  });
  return users;
};
const saveToLocalStorage = (user: User) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

@Injectable()
export class UserEffects {
  fetchingUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.FETCHING_START),
      mergeMap((authData: AuthActions.fetchingStart) => {
        return this.http
          .get(
            'https://weight-app-d2c84-default-rtdb.firebaseio.com/users.json?auth=' +
              authData.payload.token
          )
          .pipe(
            tap((res) => {
              if (!Array.isArray(res)) {
                //in case if firebase returns data with string property
                const users = [];
                for (let key in res) {
                  users.push({ ...res[key][0] });
                }
                addMealWeightActivityArrays(users); // adding  empty [] in case if firebase gives activities, weight and meals undefined;

                return users;
              } else {
                addMealWeightActivityArrays(res);

                return res;
              }
            }),
            map((users: User[]) => {
              const logged: User = users.find(
                (user) => user.email === authData.payload.email
              );
              const loggedUser = { ...logged };
              if (loggedUser) {
                loggedUser.token = authData.payload.token;
              }
              if (authData.payload.registeredUser) {
                this.store.dispatch(
                  new UsersActions.fetchingOnlyUsers({ users: users })
                );
                this.router.navigate(['/login']);
                const newRegisteredUser = {
                  ...authData.payload.registeredUser,
                };
                newRegisteredUser.token = authData.payload.token;
                this.store.dispatch(
                  new UsersActions.userRegistered({
                    user: newRegisteredUser,
                  })
                );
                return new UsersActions.storeUsers();
              }

              if (authData.payload.onlyUsers) {
                return new UsersActions.fetchingOnlyUsers({ users: users });
              } else {
                this.router.navigate(['/']);
                this.store.dispatch(new AuthActions.userLoggedIn(loggedUser));
                saveToLocalStorage(loggedUser);

                return new UsersActions.fetchingUserAndUsers({
                  users,
                  loggedUser,
                });
              }
            }),

            catchError((err) => {
              console.log('error  ', err);
              return of(new AuthActions.userLogOut());
            })
          );
      })
    )
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      map(() => {
        this.router.navigate(['/']);
        return new UsersActions.LoggedOut();
      })
    )
  );

  storeUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActionTypes.STORE_USERS),
        withLatestFrom(this.store.select('data')),
        switchMap(([actionData, userData]) => {
          // saveToLocalStorage(userData.user);
          return this.http.put(
            'https://weight-app-d2c84-default-rtdb.firebaseio.com/users.json?auth=' +
              userData.user.token,
            userData.users
          );
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType('AUTO_LOGIN_START'),
      map(() => {
        const user: User = JSON.parse(localStorage.getItem('userData'));
        if (!user) return { type: 'DUMMY' };
        this.store.dispatch(new UsersActions.autoLogin({ user: user }));
        return new AuthActions.fetchingStart({
          token: user.token,
          email: user.email,
          onlyUsers: true,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
