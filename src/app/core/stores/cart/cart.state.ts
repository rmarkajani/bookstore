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
