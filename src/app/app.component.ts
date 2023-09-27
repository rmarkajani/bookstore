import { Component, inject } from '@angular/core';
import { LoadBooks } from './core/stores/cart/cart.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  store = inject(Store)

  constructor() {
    this.store.dispatch(LoadBooks)
  }
}
