import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Department } from '../models/department.model';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient, private info: InfoService) {}

  public getAllDepartments(): Observable<Department[]> {
    return this.httpClient
      .get<Department[]>(`${this.info.apiBase}/department`)
      .pipe(
        take(1),
        map((department: Department[]) =>
          department.map((department: Department) => new Department(department))
        )
      );
  }

  public getDepartmentByCostCenter(
    costCenterId: string
  ): Observable<Department[]> {
    return this.httpClient
      .get<Department[]>(
        `${this.info.apiBase}/department/cost-center/${costCenterId}`
      )
      .pipe(
        take(1),
        map((department: Department[]) =>
          department.map((department: Department) => new Department(department))
        )
      );
  }

  public getById(id: string): Observable<Department> {
    return this.httpClient
      .get<Department>(`${this.info.apiBase}/department/${id}`)
      .pipe(
        take(1),
        map((department: Department) => new Department(department))
      );
  }

  public createOrUpdate(department: any, id?: string) {
    const endpoint = `${this.info.apiBase}/department/`;
    const payload = JSON.stringify(department);
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    if (id) {
      return this.httpClient.put(`${endpoint}/${id}`, payload, config);
    }
    return this.httpClient.post(endpoint, payload, config);
  }

  public delete(id: string) {
    const endpoint = `${this.info.apiBase}/department/`;
    return this.httpClient.delete(`${endpoint}/${id}`);
  }
}
