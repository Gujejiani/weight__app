import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit() {
    const { email, password } = this.formData.value.form;

    const confirmation: {
      login: boolean;
      message: string;
    } = this.loginService.login(email, password);
    if (confirmation.login === false) {
      this.invalidUser = true;
      this.message = confirmation.message;
    }
    if (confirmation.login === true) {
      this.router.navigate(['dashboard']);
    }
  }
  onClick() {
    console.log('change');
    this.message = '';
  }
}
