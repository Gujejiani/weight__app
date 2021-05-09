import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit {
  @Input() date: string;
  @Input() wantsToGainWeight: string;
  @Input() current: number;
  @Input() desired: number;
  @Input() message: string;
  @Input() className;
  @Input() type = 'string';
  constructor() {}

  ngOnInit(): void {}
}
