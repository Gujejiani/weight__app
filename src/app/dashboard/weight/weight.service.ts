import { Injectable, ɵɵsetComponentScope } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeightService {
  //generates message for weight, meal and activity
  generateMessage(current, desired, wantsToGainWeight, user, unit, unitName) {
    let message;
    if (desired > current && wantsToGainWeight) {
      message = `${
        desired - current
      } ${unit} left to your desired ${unitName}, continue good
            Work!`;
    }
    if (current > desired && wantsToGainWeight) {
      message = `${user} congratulation You have reached your desired ${unitName} + ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    if (current > desired && !wantsToGainWeight) {
      message = ` you need to lose ${
        current - desired
      } ${unit} for your desired ${unitName}, continue good
            Work!`;
    }
    if (current < desired && !wantsToGainWeight) {
      message = `${user} congratulation Your desired daily ${unitName} are lower than your daily ${unitName}  - ${Math.abs(
        desired - current
      )} ${unit}`;
    }

    return message;
  }
}
