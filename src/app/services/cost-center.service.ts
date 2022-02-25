import { HttpClient } from '@angular/common/http';
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
}
