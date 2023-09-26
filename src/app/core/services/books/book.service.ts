import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  updateBookQuantity(bookId: number, newQuantity: number): Observable<any> {
    const url = `${this.baseUrl}/${bookId}`;
    return this.http.put(url, { quantity: newQuantity });
  }
}