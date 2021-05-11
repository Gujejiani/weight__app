import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseService } from 'src/app/database/database.service';
import { User } from 'src/app/profile/user.modal';

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
    private router: Router,
    private auth: AuthService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.loading = true;
    const { email, password } = this.formData.value.form;

    this.auth.login(email, password).subscribe(
      (resData) => {
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
  }

  onClick() {
    this.message = '';
  }
}
