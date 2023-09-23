import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // Create an instance of HttpHeaders and set the header values
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2t5cmlja0Bhd2Vzb21lLmNvbSIsIl9pZCI6IjY1MGU3ZTUzOGM2M2EwYWFhN2I3ZTJiZiIsImlhdCI6MTY5NTQ1MDUyMCwiZXhwIjoxNjk1NDU0MTIwfQ.YZORACLZFGnRezIHqt4DNIXH7a0rUD7IipJ2MK-6yGU',
      Accept: 'application/json',
    }),
  };
  getUsers(): Observable<User[]> {
    return this.http.get(this.URL, this.httpOptions) as Observable<
      User[]
    >;
  }
  getUser(id: string): Observable<User> {
    return this.http.get(
      `${this.URL}/${id}`,
      this.httpOptions
    ) as Observable<User>;
  }

  createUser(user: User) {
    return this.http.post(this.URL, user, this.httpOptions).subscribe();
  }
}
