import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/interfaces/book.interface';
import { RemoveFromCart } from 'src/app/core/stores/cart/cart.actions';
import { CartState } from 'src/app/core/stores/cart/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Select(CartState.getCart) cart$: Observable<Book[]>;
  @Select(CartState.getSubtotal) subTotal$: Observable<number>;

  private store = inject(Store);
  
  removeFromCart(book: Book) {
    this.store.dispatch(new RemoveFromCart(book));
  }
}
