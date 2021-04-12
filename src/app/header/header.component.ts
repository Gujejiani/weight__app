import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  subscription: Subscription;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.loginService.userLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.loggedIn = loggedIn;
      }
    );
    this.loggedIn = this.loginService.loggedIn;
  }

  onLogout() {
    this.loggedIn = false;
    this.loginService.logOut();
    this.router.navigate(['']);
    this.subscription.unsubscribe();
  }
}
