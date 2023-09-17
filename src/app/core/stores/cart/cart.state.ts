import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart } from './cart.actions';
import { Book } from '../../interfaces/book.interface';

export class CartStateModel {
  public cart: Book[] = [];
}

const defaults = {
  cart: [],
};

@State<CartStateModel>({
  name: 'cart',
  defaults,
})
@Injectable()
export class CartState {
  @Selector()
  static getCartQuantity(state: CartStateModel) {
    return state.cart.length;
  }  

  @Selector()
  static getSubtotal(state: CartStateModel): number {
    // Calculate the subtotal by summing up the prices of items in the cart
    return state.cart.reduce((acc, book) => acc + book.price, 0);
  }

  @Selector()
  static getCart(state: CartStateModel): Book[] {
    return state.cart;
  }

  @Action(AddToCart)
  add(
    { getState, setState }: StateContext<CartStateModel>,
    { payload }: AddToCart
  ) {
    const state = getState();
    setState({ cart: [...state.cart, payload] });

    // http put update db
  }

  @Action(RemoveFromCart)
  removeFromCart(
    { getState, setState }: StateContext<CartStateModel>,
    { payload }: RemoveFromCart
  ) {
    const state = getState();
    setState({ cart: [...state.cart, payload] });

    // http put update db
  }
}
