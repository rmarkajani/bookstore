import { Book } from '../../interfaces/book.interface';

export class AddToCart {
  static readonly type = '[Cart] Add To Cart';
  constructor(public payload: Book) {}
}
export class RemoveFromCart {
  static readonly type = '[Cart] Remove From Cart';
  constructor(public payload: Book) {}
}

export class LoadBooks {
  static readonly type = '[Cart] Load Books';
}
export class DecrementBookQuantity {
  static readonly type = '[Cart] Deccrement Book Quantity';
  constructor(public bookId: string) {}
}
export class FilterByCategory {
  static readonly type = '[Cart] Filter By Category';
  constructor(public category: string) {}
}
