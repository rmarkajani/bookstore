import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { AddToCart } from 'src/app/core/stores/cart/cart.actions';
import { Book } from 'src/app/core/interfaces/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  showBooks: boolean = false;
  booklist: Book[] = [];
  originalList: Book[] = [];
  books: string[] = [];
  selectedCategory: string = 'All Books';

  private http = inject(HttpClient);
  private store = inject(Store);
  constructor() {}

  ngOnInit(): void {
    this.loadCSV();
  }

  addToCart(book: Book) {
    this.store.dispatch(new AddToCart(book));
  }

  filterByCategory(category: string) {
    this.showBooks = false;
    this.selectedCategory = category;
    if (category === 'All Books') {
      this.originalList = this.booklist;
    } else {
      this.originalList = this.booklist.filter(
        (book: Book) => book.genre === category
      );
    }
  }

  loadCSV(): void {
    this.http.get('assets/booklist.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let lines = data.split('\n');
        let headers = lines[0].replace(/\r/g, '').split(',');

        for (let i = 1; i < lines.length; i++) {
          // Skip empty or null lines
          if (!lines[i] || lines[i].trim() === '') {
            continue;
          }

          let obj: any = {};
          let currentline = this.csvLineToArray(lines[i]);

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j].toLocaleLowerCase()] = currentline[j];
          }

          this.booklist.push(obj);
        }

        this.originalList = this.booklist;
        this.books = [
          'All Books',
          ...Array.from(new Set(this.booklist.map((book) => book.genre))),
        ];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  csvLineToArray(text: string): string[] {
    let ret: string[] = [];
    let inQuote: boolean = false;
    let value: string = '';

    for (let ch of text) {
      if (inQuote) {
        if (ch === '"') {
          inQuote = false;
        } else {
          value += ch;
        }
      } else {
        if (ch === '"') {
          inQuote = true;
        } else if (ch === ',') {
          ret.push(value);
          value = '';
        } else {
          value += ch;
        }
      }
    }
    ret.push(value);
    return ret;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.showBooks = false;
    }
  }
}
