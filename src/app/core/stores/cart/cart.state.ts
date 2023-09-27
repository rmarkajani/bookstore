import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, LoadBooks, RemoveFromCart } from './cart.actions';
import { Book } from '../../interfaces/book.interface';
import { BOOKS } from './books';

export class CartStateModel {
  public cart: Book[] = [];
  public books: Book[] = [];
  public subTotal: number;
}

const defaults = {
  cart: [],
  books: [],
  subTotal: 0
};

@State<CartStateModel>({
  name: 'cart',
  defaults,
})
@Injectable()
export class CartState {
  @Selector()
  static getBooks(state: CartStateModel) {
    return state.books;
  }  
  @Selector()
  static getCartQuantity(state: CartStateModel) {
    return state.cart.length;
  }  

  @Selector()
  static getSummary(state: CartStateModel): { subTotal: number; subTax: number; total: number; } {
    // Calculate the subtotal by summing up the prices of items in the cart
    const subTotal = state.cart.reduce((acc, book) => acc + book.price, 0);
    const subTax = +(subTotal * 0.08).toFixed(2)
    const total = +(subTax).toFixed(2) + +(subTotal).toFixed(2)
    return {subTotal: subTotal, subTax: subTax, total: total};
  }

  @Selector()
  static getCart(state: CartStateModel): Book[] {
    return state.cart;
  }

  books:Book[] = BOOKS
  @Action(LoadBooks)
  loadBooks(
    { patchState }: StateContext<CartStateModel>
  ) {
  patchState({ books: this.books, });

    // http put update db
  }

  @Action(AddToCart)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddToCart
  ) {
    const state = getState();
    patchState({ cart: [...state.cart, payload], subTotal: state.subTotal + payload.price });

    // http put update db
  }

  @Action(RemoveFromCart)
  removeFromCart(
    { getState, setState }: StateContext<CartStateModel>,
    { payload }: RemoveFromCart
  ) {
    const state = getState();
    const updatedCart = state.cart.filter((item) => item.price !== payload.price);

    setState({
      ...state,
      cart: updatedCart
    });
    // setState({ cart: [...state.cart, payload] });

    // http put update db
  }
}
