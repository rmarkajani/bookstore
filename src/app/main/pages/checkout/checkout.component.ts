import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/interfaces/book.interface';
import { BookService } from 'src/app/core/services/books/book.service';// Import BookService
import { DecrementBookQuantity } from 'src/app/core/stores/cart/cart.actions';
import { CartState } from 'src/app/core/stores/cart/cart.state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  
  @Select(CartState.getCart) cart$: Observable<Book[]>;
  bookId: number;
  newQuantity: number;
  store = inject(Store)

  constructor(
    private router: Router,
    private bookService: BookService // Inject BookService
  ) { }

  decrementBookQuantities(books: Book[]) {
    books.map((book: Book) => {
      this.store.dispatch(new DecrementBookQuantity(book.id));
    });
    this.router.navigate(['../confirmation']);
  }

  goToConfirmation(bookId: number, newQuantity: number) {
    // Assuming you have the bookId and newQuantity values from somewhere in your checkout process
    this.bookService.updateBookQuantity(bookId, newQuantity).subscribe(
      (response) => {
        console.log('Book quantity updated successfully', response);
        // Handle success, maybe navigate to a success page
        this.router.navigate(['../confirmation']);
      },
      (error) => {
        console.error('Error updating book quantity', error);
        // Handle error
      }
    );
  }
}
