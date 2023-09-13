import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AddToCart } from './cart.actions';
import { Book } from '../../interfaces/book.interface';

export class CartStateModel {
  public items: Book[] = [];
}

const defaults = {
  items: [],
};

@State<CartStateModel>({
  name: 'cart',
  defaults,
})
@Injectable()
export class CartState {
  @Action(AddToCart)
  add(
    { getState, setState }: StateContext<CartStateModel>,
    { payload }: AddToCart
  ) {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
}
