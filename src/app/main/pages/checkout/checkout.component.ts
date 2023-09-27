import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/core/services/books/book.service';// Import BookService

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  bookId: number;
  newQuantity: number;
  
  constructor(
    private router: Router,
    private bookService: BookService // Inject BookService
  ) { }

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
