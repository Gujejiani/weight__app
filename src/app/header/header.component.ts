import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.userLoggedIn.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
    this.loggedIn = this.loginService.loggedIn;
  }

  onLogout() {
    this.loggedIn = false;
    this.loginService.logOut();
    this.router.navigate(['']);
  }
}
