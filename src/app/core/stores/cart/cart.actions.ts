export class CartAction {
  static readonly type = '[Cart] Add item';
  constructor(public payload: string) { }
}
