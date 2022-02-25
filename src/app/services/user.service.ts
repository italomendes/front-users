import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { User } from '../models/user.model';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private info: InfoService) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.info.apiBase}/user`).pipe(
      take(1),
      map((users: User[]) => users.map((user: User) => new User(user)))
    );
  }
}
