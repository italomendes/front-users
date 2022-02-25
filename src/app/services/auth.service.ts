import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private infoService: InfoService,
    private httpClient: HttpClient
  ) {}

  public login(payload: { username: string; password: string }) {
    const endpoint = `${this.infoService.apiBase}/user/login`;

    return this.httpClient.post(endpoint, payload);
  }

  private setSession(token: string) {
    const expiresAt = moment().add(3600, 'second');

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
}
