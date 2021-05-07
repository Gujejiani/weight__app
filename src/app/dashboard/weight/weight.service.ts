import { Injectable, ɵɵsetComponentScope } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeightService {
  //generates message for weight, meal and activity
  generateMessage(
    current: number,
    desired: number,
    wantsToGainWeight: boolean,
    user: string,
    unit: string,
    unitName: string
  ) {
    let message;
    if (desired > current && wantsToGainWeight) {
      message = `${
        desired - current
      } ${unit} left to your desired ${unitName}, continue good
            Work ${this.capitalizeFirstLetter(user)}!`;
    }
    if (current > desired && wantsToGainWeight) {
      message = `${this.capitalizeFirstLetter(
        this.capitalizeFirstLetter(user)
      )} congratulation You have reached your desired ${unitName} + ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    if (current > desired && !wantsToGainWeight) {
      message = ` you need to lose ${
        current - desired
      } ${unit} for your desired ${unitName}, continue good
            Work ${this.capitalizeFirstLetter(user)}!`;
    }
    if (current < desired && !wantsToGainWeight) {
      message = `${this.capitalizeFirstLetter(
        user
      )} congratulation Your desired daily ${unitName} are lower than your daily ${unitName}  - ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    if (current === desired) {
      message = ` Congratulation for your great work  ${this.capitalizeFirstLetter(
        user
      )}!`;
    }

    return message;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
