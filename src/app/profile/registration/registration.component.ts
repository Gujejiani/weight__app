import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/shared/registration.service';
import { User } from '../user.modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild('form') ngForm: NgForm;
  @ViewChild('password') password: ElementRef;
  userEmail: string = 'sa';
  user: User;
  purpose: string = 'gain';
  passwordConfirmed: boolean = false;
  userAlreadyRegistered: boolean = false;

  confirmingPassword(e) {
    if (e.target.value === this.ngForm.value.formData.password) {
      this.passwordConfirmed = true;
    } else {
      this.passwordConfirmed = false;
    }
  }

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.ngForm.value.formData);
    const form: {
      name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      purpose: string;
    } = this.ngForm.value.formData;
    if (form.password === form.confirmPassword) {
      this.user = new User(
        form.username,
        form.email,
        form.password,
        [],
        [],
        [],

        {
          weight: 0,
          meal: 0,
          activity: 0,
        },
        form.purpose,
        false
      );
      if (this.registrationService.getUserData(this.user.email)) {
        console.log('user already exits');
        this.userAlreadyRegistered = true;
        this.userEmail = form.email;
      } else {
        this.registrationService.userRegistered(this.user);
        this.userAlreadyRegistered = false;
        this.router.navigate(['/login']);
      }
    }
  }
}
