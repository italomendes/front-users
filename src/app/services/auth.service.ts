import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private infoService: InfoService, private httpClient: HttpClient) { }

  public login(payload: {username: string, password: string}) {
    const endpoint = `${this.infoService.apiBase}/user/login`;

    return this.httpClient.post(endpoint, payload);
  }
}
