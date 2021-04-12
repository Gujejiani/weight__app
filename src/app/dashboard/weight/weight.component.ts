import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';
import { CanComponentDeactivate } from 'src/app/shared/saved-guard/saved-guard.service';
import { UserService } from 'src/app/shared/user.service';
import { Weight } from './weight.modal';
@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent implements OnInit, CanComponentDeactivate {
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
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.loggedIn) {
      this.weights = this.userService.user?.weights;
      this.counter = this.userService.user.weights?.length;
      this.userName = this.userService.user.name;
      this.desiredWeight = this.userService.user.desired.weight
        ? this.userService.user.desired.weight
        : 0;

      if (
        this.activatedRoute.snapshot.queryParams.desiredMode &&
        this.userService.user
      ) {
        this.desiredMode = true;
        this.prevDesired = this.userService.user.desired.weight;
      }
    }
    if (this.activatedRoute.snapshot.params.current) {
      this.prevWeight = +this.activatedRoute.snapshot.params.current;
    }
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
      this.userService.addWeight(this.weight);
    } else {
      this.alreadyExists = true;
    }
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
  onDelete() {
    this.userService.deleteWeight(this.ngForm.value.date);
    this.ngForm.reset();
    this.counter = this.userService.user.weights.length;
  }
  onUpdate() {
    this.weight.weight = this.ngForm.value.weight;
    this.weight.date = this.ngForm.value.date;
    this.userService.updateWeight(this.weight?.id, this.weight);
    this.editMode = false;
    this.ngForm.reset();
    this.router.navigate(['dashboard']);
    this.changesSaved = true;
  }

  saveDesired() {
    const desiredWeight = +this.ngForm.value.weight;

    this.userService.user.desired.weight = desiredWeight;
    this.userService.updateUser();
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
}
