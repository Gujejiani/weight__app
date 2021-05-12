import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/auth/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { Weight } from './weight.modal';

import { WeightService } from './weight.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent
  implements OnInit, CanComponentDeactivate, OnDestroy
{
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

    private weightService: WeightService
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

      this.weightService.addWeight(this.weights, this.weight);
    } else {
      this.alreadyExists = true;
    }
    this.resetForm();
  }
  onDelete() {
    this.weightService.deleteWeight(this.weights, +this.weight.id);
    this.resetForm();
    this.changesSaved = true;
  }
  onUpdate() {
    const weight = this.ngForm.value.weight;
    const date = this.ngForm.value.date;
    this.weightService.updateWeights(
      this.weights,
      new Weight(this.weight.id, date, weight),
      this.weight.id
    );

    this.resetForm();
    this.router.navigate(['dashboard']);
    this.changesSaved = true;
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
    this.weightService.addDesiredWeight(+desiredWeight);

    this.router.navigate(['/dashboard']);
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.changesSaved);
    if (this.changesSaved) {
      return true;
    }
    return this.weightService.canDeactivate(
      this.changesSaved,
      +this.weight.weight,
      +this.ngForm.value.weight
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
