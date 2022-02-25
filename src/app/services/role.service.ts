import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { Role } from '../models/role.model';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient, private info: InfoService) {}

  public getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.info.apiBase}/role`).pipe(
      take(1),
      map((roles: Role[]) => roles.map((role: Role) => new Role(role)))
    );
  }

  public getById(id: string): Observable<Role> {
    return this.httpClient.get<Role>(`${this.info.apiBase}/role/${id}`).pipe(
      take(1),
      map((role: Role) => new Role(role))
    );
  }

  public createOrUpdate(role: any, id?: string) {
    const endpoint = `${this.info.apiBase}/role/`;
    const payload = JSON.stringify(role);
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    if (id) {
      return this.httpClient.put(`${endpoint}/${id}`, payload, config);
    }
    return this.httpClient.post(endpoint, payload, config);
  }

  public delete(id: string) {
    const endpoint = `${this.info.apiBase}/role/`;
    return this.httpClient.delete(`${endpoint}/${id}`);
  }
}
