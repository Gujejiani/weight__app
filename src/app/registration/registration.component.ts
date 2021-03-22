import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { from } from 'rxjs';
import { User } from '../shared/user.modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild('form') ngForm: NgForm;
  @ViewChild('password') password: ElementRef;
  user: User;
  passwordConfirmed: boolean = false;

  confirmingPassword(e) {
    if (e.target.value === this.ngForm.value.formData.password) {
      this.passwordConfirmed = true;
    } else {
      this.passwordConfirmed = false;
    }
  }

  constructor() {}
  @ViewChild('email') email: NgModel;
  ngOnInit(): void {}
  onSubmit() {
    const form: {
      name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      desiredWeight: string;
      desiredMeal: string;
      desiredActivity: string;
    } = this.ngForm.value.formData;
    if (form.password === form.confirmPassword) {
    }
    this.user = new User(
      form.username,
      form.email,
      form.password,
      +form.desiredWeight,
      +form.desiredMeal,
      +form.desiredActivity
    );
    console.log(this.user);
  }
}
