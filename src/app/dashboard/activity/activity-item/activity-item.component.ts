import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Activity } from '../activity.modal';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() activities: Activity[];
  @Output() activityClicked = new EventEmitter<Activity>();
  constructor() {}

  ngOnInit(): void {}
  onActivityClick(activity: Activity) {
    this.activityClicked.emit(activity);
  }
}
