import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  constructor() {}

  URL = 'http://localhost:3000/users';
  getUsers() {
    return this.http.get(this.URL);
  }
  getUser(id: string) {
    return this.http.get(`${this.URL}/${id}`);
  }
}
