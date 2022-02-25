import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  employees: User[] = [];

  constructor(private userService: UserService) {
    this.userService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((_users: User[]) => {
        this.employees = _users;
      });
  }

  ngOnInit(): void {}

  // public getAllUsers(): User[] {
  //   let users: User[] = [];
  //   this.userService
  //     .getAllUsers()
  //     .pipe(take(1))
  //     .subscribe((_users: User[]) => {
  //       users = _users;
  //     });
  //   return users;
  // }
}
