import { Injectable } from '@angular/core';
import { User } from '../profile/user.modal';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private users: User[] = [];
  constructor(private authService: AuthService) {}
  userRegistered(user: User) {
    this.users.push(user);

    // this.authService.signUp(user);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
  addUsers(users: User[]) {
    users.forEach((user) => {
      this.users.push(user);
    });
  }

  getUserData(email: string) {
    return this.users.find((user) => {
      return user.email === email;
    });
  }

  updateUsersData(email: string, user: User) {
    const index = this.users.findIndex((user) => user.email === email);
    this.users[index] = user;
    this.saveToLocalStorage();
  }
}
