import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

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
  getUser(id: string): Observable<User> {
    return this.http.get(`${this.URL}/${id}`) as Observable<User>;
  }

  createUser(user: User) {
    console.log(user);
    
    return this.http.post(this.URL, user, ).subscribe();
  }
}
