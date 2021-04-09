import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';

import { RegistrationService } from './shared/registration.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weightApp';

  constructor(
    private registrationService: RegistrationService,
    private loginService: LoginService
  ) {}
  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('users'));
    console.log('app load');
    if (users) {
      this.registrationService.addUsers(users);
      this.loginService.checkIfUserHasToken(users);
    }
  }
}
