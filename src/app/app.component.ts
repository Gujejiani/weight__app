import { Component, OnInit } from '@angular/core';

import { UserService } from './shared/user.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weightApp';

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoLogin();
    // const users = JSON.parse(localStorage.getItem('users'));
    // console.log('app load');
    // if (users) {
    //   this.registrationService.addUsers(users);
    //   this.loginService.checkIfUserHasToken(users);
    // }
  }
}
