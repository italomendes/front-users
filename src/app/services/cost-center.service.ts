import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { CostCenter } from '../models/cost-center.model';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterService {
  constructor(private httpClient: HttpClient, private info: InfoService) {}

  public getAllCostCenter(): Observable<CostCenter[]> {
    return this.httpClient
      .get<CostCenter[]>(`${this.info.apiBase}/cost-center`)
      .pipe(
        take(1),
        map((costCenter: CostCenter[]) =>
          costCenter.map((costCenter: CostCenter) => new CostCenter(costCenter))
        )
      );
  }

  public getById(id: string): Observable<CostCenter> {
    return this.httpClient
      .get<CostCenter>(`${this.info.apiBase}/cost-center/${id}`)
      .pipe(
        take(1),
        map((costCenter: CostCenter) => new CostCenter(costCenter))
      );
  }

  public createOrUpdate(costCenter: CostCenter, id?: string) {
    const endpoint = `${this.info.apiBase}/cost-center/`;
    const payload = JSON.stringify(costCenter);
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    if (id) {
      return this.httpClient.put(`${endpoint}/${id}`, payload, config);
    }
    return this.httpClient.post(endpoint, payload, config);
  }

  public delete(id: string) {
    const endpoint = `${this.info.apiBase}/cost-center/`;
    return this.httpClient.delete(`${endpoint}/${id}`);
  }
}
