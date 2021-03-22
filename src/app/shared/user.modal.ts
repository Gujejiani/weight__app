export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private desiredWeight: number,
    private desiredMeal: number,
    private desiredActivity: number
  ) {}
}
