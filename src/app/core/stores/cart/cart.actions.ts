import { Book } from '../../interfaces/book.interface';

export class AddToCart {
  static readonly type = '[Cart] Add To Cart';
  constructor(public payload: Book) {}
}
