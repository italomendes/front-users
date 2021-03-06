import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService, public router: Router) {}

  // public getUserName() {
  //   return this.auth.loggedUser?.name;
  // }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
