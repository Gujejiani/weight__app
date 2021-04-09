import { Input } from '@angular/core';

export class Meal {
  constructor(
    public name: string,
    public calories: number,
    public date: Date,
    public id: number
  ) {}
}
