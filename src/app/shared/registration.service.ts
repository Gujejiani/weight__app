import { Injectable } from '@angular/core';
import { User } from '../profile/user.modal';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private users: User[] = [];
  constructor() {}
  userRegistered(user: User) {
    this.users.push(user);
    console.log(this.users);
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
