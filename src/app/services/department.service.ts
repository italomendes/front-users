import { HttpClient } from '@angular/common/http';
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
      .get<Department[]>(`${this.info.apiBase}/department/${costCenterId}`)
      .pipe(
        take(1),
        map((department: Department[]) =>
          department.map((department: Department) => new Department(department))
        )
      );
  }
}
