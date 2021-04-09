import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Weight } from '../weight.modal';

@Component({
  selector: 'app-weight-item',
  templateUrl: './weight-item.component.html',
  styleUrls: ['./weight-item.component.scss'],
})
export class WeightItemComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() weights: Weight[] = [];
  @Output() weightClicked = new EventEmitter<Weight>();
  constructor() {}

  ngOnInit(): void {}
  onWeightClicked(weight: Weight) {
    this.weightClicked.emit(weight);
  }
}
