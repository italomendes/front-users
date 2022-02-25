import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private mApiBase = 'http://localhost:3333';

  get apiBase() {
    return this.mApiBase;
  }

  constructor() {
  }
}
