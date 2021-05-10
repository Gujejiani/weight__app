import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CanComponentDeactivate } from 'src/app/auth/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { Weight } from './weight.modal';
import * as UserActions from '../store/users.actions';

import { DatabaseService } from 'src/app/database/database.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  alreadyExists: boolean = false;
  @ViewChild('f') ngForm: NgForm;
  weight: Weight;
  weights: Weight[] = [];
  showModal: boolean = false;
  userName: string;
  counter = 0;
  editMode: boolean = false;
  desiredMode: boolean = false;
  prevDesired: number = 0;
  desiredWeight: number = 0;
  prevWeight: number;
  changesSaved: boolean = true;

  subscription: Subscription;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select('data').subscribe((usersData) => {
      if (usersData.user) {
        this.weights = usersData.user?.weights;
        this.counter = usersData.user.weights?.length;
        this.userName = usersData.user.name;
        this.desiredWeight = usersData.user.desired.weight
          ? usersData.user.desired.weight
          : 0;

        if (
          this.activatedRoute.snapshot.queryParams.desiredMode &&
          usersData.user
        ) {
          this.desiredMode = true;
          this.prevDesired = usersData.user.desired.weight;
        }
      }
      if (this.activatedRoute.snapshot.params.current) {
        this.prevWeight = +this.activatedRoute.snapshot.params.current;
      }
    });
  }

  onSubmit() {
    const date = this.ngForm.value.date;
    const weight = +this.ngForm.value.weight;
    const alreadyExists = this.weights.findIndex((item) => {
      return item.date === date;
    });

    if (alreadyExists < 0) {
      let maxId = this.userService.generateUniqueID(this.weights);
      this.weight = new Weight(maxId, date, weight);
      this.alreadyExists = false;
      // this.userService.addWeight(this.weight); //change with store
      const weights: Weight[] = [...this.weights];
      weights.push(this.weight);
      this.store.dispatch(
        new UserActions.weightsArrayUpdate({ weights: weights })
      );
      this.updateState();
    } else {
      this.alreadyExists = true;
    }
    this.resetForm();
  }
  onDelete() {
    const date = this.ngForm.value.date;
    const index = this.weights.findIndex(
      (weight) => String(weight.date) === date
    );
    const weights: Weight[] = [...this.weights];
    weights.splice(index, 1);

    this.store.dispatch(
      new UserActions.weightsArrayUpdate({ weights: weights })
    );

    this.resetForm();
    this.updateState();
  }
  onUpdate() {
    const weight = this.ngForm.value.weight;
    const date = this.ngForm.value.date;
    // this.userService.updateWeight(this.weight?.id, this.weight);
    console.log('problem occurs');
    const weights: Weight[] = [...this.weights];
    console.log('problem end');
    const index = weights.findIndex((weight) => weight.id === this.weight.id);
    weights[index] = new Weight(this.weight.id, date, weight);
    this.store.dispatch(
      new UserActions.weightsArrayUpdate({ weights: weights })
    );
    this.updateState();
    this.resetForm();
    this.router.navigate(['dashboard']);
    this.changesSaved = true;
  }
  updateState() {
    this.store.dispatch(new UserActions.updateUser());
    this.database.updateUsers();
  }

  resetForm() {
    this.editMode = false;
    this.ngForm.reset();
    this.counter = this.weights.length;
  }
  onWeightModal() {
    this.showModal = true;
  }
  weightClicked(weight: Weight) {
    this.ngForm.setValue({
      date: weight.date,
      weight: weight.weight,
    });
    this.weight = weight;
    this.hideModal();
    this.editMode = true;
    this.changesSaved = false;
  }
  hideModal() {
    this.showModal = false;
  }

  saveDesired() {
    const desiredWeight = +this.ngForm.value.weight;

    this.store.dispatch(
      new UserActions.desiredWeightAdded({ desiredWeight: desiredWeight })
    );
    this.updateState();
    this.router.navigate(['/dashboard']);
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    }

    if (!this.changesSaved && this.weight.weight !== this.ngForm.value.weight) {
      return confirm('do you want to discard changes?');
    } else {
      return true;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
