import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { CartAction } from './cart.actions';

export class CartStateModel {
  public items: string[] = [];
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
  @Action(CartAction)
  add(
    { getState, setState }: StateContext<CartStateModel>,
    { payload }: CartAction
  ) {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
}
