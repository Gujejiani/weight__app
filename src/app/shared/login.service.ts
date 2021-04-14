import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../profile/user.modal';
import { AuthGuard } from './auth-guard/auth-guard.service';
import { RegistrationService } from './registration.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  userLoggedIn = new Subject<boolean>();
  loginTimer;
  loggedIn: boolean = false;
  constructor(
    private registrationService: RegistrationService,
    private userService: UserService
  ) {}
  login(email: string, password: string) {
    const registered = this.registrationService.getUserData(email);

    if (registered) {
      if (registered.email === email && registered.password === password) {
        this.loggedIn = true;
        this.userService.userLoggedIn(
          new User(
            registered.name,
            registered.email,
            registered.password,
            registered.weights,
            registered.meals,
            registered.activities,
            registered.desired,
            registered.purpose,
            registered.token
          )
        );
        this.loginTimerStart();
        this.userLoggedIn.next(true);
        console.log('true');
        return {
          login: true,
          message: 'user logged in',
        };
      }
      if (registered.email === email && registered.password !== password) {
        return {
          login: false,
          message: 'password is not valid',
        };
      }
    } else {
      return {
        login: false,
        message: 'can not find such a user',
      };
    }
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false;
    this.userLoggedIn.next(false);
    this.userService.userLogOut();

    clearTimeout(this.loginTimer);
  }
  isAuthenticated() {
    return this.loggedIn;
  }

  checkIfUserHasToken(users: User[]) {
    users.forEach((user) => {
      if (user.token) {
        this.loggedIn = true;
        this.userService.userLoggedIn(user);
      }
    });
  }

  loginTimerStart() {
    this.loginTimer = setTimeout(() => {
      this.loggedIn = false;

      this.userService.userLogOut();
    }, 60000);
  }
}
