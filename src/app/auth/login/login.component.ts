import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseService } from 'src/app/database/database.service';
import { User } from 'src/app/profile/user.modal';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') formData: NgForm;
  message: string = '';
  invalidUser: boolean = false;
  loading: boolean = false;
  user: User;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private auth: AuthService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    if (this.loginService.loggedIn) {
      this.router.navigate(['dashboard']);
    }
  }
  onSubmit() {
    this.loading = true;
    const { email, password } = this.formData.value.form;
    console.log('ahjaha');
    this.auth.login(email, password).subscribe(
      (resData) => {
        console.log(resData);
        console.log('dadam');
        this.router.navigate(['dashboard']);

        this.loading = false;
        this.database.getDataFromFirebase(resData.idToken, email);
      },
      (errorMessage) => {
        this.invalidUser = true;
        this.message = errorMessage;
        this.loading = false;
      }
    );

    // const confirmation: {
    //   login: boolean;
    //   message: string;
    // } = this.loginService.login(email, password);
    // if (confirmation.login === false) {
    //   this.invalidUser = true;
    //   this.message = confirmation.message;
    // }
    // if (confirmation.login === true) {
    //   this.router.navigate(['dashboard']);
    // }
  }
  postData() {
    this.database.updateUsers();
  }
  onClick() {
    const user = 'badri esebua';
    this.message = '';
  }
}
