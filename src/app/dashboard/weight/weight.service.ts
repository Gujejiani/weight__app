import { Injectable, ɵɵsetComponentScope } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeightService {
  generateMessage(current, desired, wantsToGainWeight, user, unit, unitName) {
    let message;
    if (desired > current && wantsToGainWeight) {
      message = `${
        desired - current
      } ${unit} left to your desired ${unitName}, continue good
            Work!`;
    }
    if (current > desired && wantsToGainWeight) {
      console.log('else');
      message = `${user} congratulation You have reached your desired ${unitName} + ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    if (current > desired && !wantsToGainWeight) {
      message = `${
        current - desired
      } ${unit} left to your desired ${unitName}, continue good
            Work!`;
    }
    if (current < desired && !wantsToGainWeight) {
      message = `${user} congratulation You have reached your desired ${unitName} + ${Math.abs(
        desired - current
      )} ${unit}`;
    }
    console.log(current, desired, wantsToGainWeight);
    return message;
  }
}
