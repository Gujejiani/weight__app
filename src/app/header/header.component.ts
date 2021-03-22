import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.loggedIn;
  }
}
