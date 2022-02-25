import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.info.apiBase}/user/${id}`).pipe(
      take(1),
      map((user: User) => new User(user))
    );
  }

  public createOrUpdate(user: any, id?: string) {
    const endpoint = `${this.info.apiBase}/user/`;
    const payload = JSON.stringify(user);
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    if (id) {
      return this.httpClient.put(`${endpoint}/${id}`, payload, config);
    }
    return this.httpClient.post(endpoint, payload, config);
  }

  public delete(id: string) {
    const endpoint = `${this.info.apiBase}/user/`;
    return this.httpClient.delete(`${endpoint}/${id}`);
  }
}
