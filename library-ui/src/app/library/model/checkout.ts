export class Checkout {
  constructor(
    public id: number,
    public bookId: number,
    public checkoutDate: Date,
    public returnDate: Date
  ) {}
}
