import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {
    this.userService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((_users: User[]) => {
        this.employees = _users;
      });
  }

  ngOnInit(): void {}

  edit(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  add() {
    this.router.navigate(['/employee/new']);
  }

  delete(id: string) {
    this.userService.delete(id).subscribe();
  }
}
