import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import {
  AddToCart,
  FilterByCategory,
} from 'src/app/core/states/cart/cart.actions';
import { Book } from 'src/app/core/interfaces/book.interface';
import { CartState } from 'src/app/core/states/cart/cart.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  @Select(CartState.getBooks) books$: Observable<Book[]>;
  @Select(CartState.getCategories) categories$: Observable<string[]>;
  showCategoriesPopup: boolean = false;
  booklist: Book[] = [];
  originalList: Book[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All Books';

  private http = inject(HttpClient);
  private store = inject(Store);
  constructor() {}

  ngOnInit(): void {}

  addToCart(book: Book) {
    this.store.dispatch(new AddToCart(book));
  }

  filterByCategory(category: string) {
    this.showCategoriesPopup = false;
    this.selectedCategory = category;
    this.store.dispatch(new FilterByCategory(category));
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.showCategoriesPopup = false;
    }
  }
}
