import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Book {
  author: string;
  title: string;
  description: string;
  genre: string;
  price: string;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  showCategories: boolean = false;
  booklist: Book[] = [];
  originalList: Book[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCSV();
  }

  filterByCategory(category: string) {
    this.showCategories = false;
    if (category === 'All Categories') {
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
        let headers = lines[0].split(',');

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
        this.categories = [
          'All Categories',
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
      this.showCategories = false;
    }
  }
}
