import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, of, take } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { DepartmentService } from 'src/app/services/department.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  form: FormGroup;
  departments: Department[] = [];
  roles: Role[] = [];
  user: User | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private roleService: RoleService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      role: [null, Validators.required],
      department: [null, Validators.required],
    });

    this.departmentService
      .getAllDepartments()
      .pipe(take(1))
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });

    this.roleService
      .getAllRoles()
      .pipe(take(1))
      .subscribe((roles: Role[]) => {
        this.roles = roles;
      });
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        mergeMap((params: Params) => {
          const id = params['id'];

          if (id !== 'new') {
            return this.userService.getById(id).pipe(
              mergeMap((user: User) => {
                this.user = user;
                this.form.patchValue(this.user);
                return of(user);
              })
            );
          }
          return of();
        })
      )
      .subscribe();
  }

  compareFn(d1: any, d2: any) {
    return d1.id === d2.id;
  }

  save() {
    const user = {
      name: this.form.getRawValue().name,
      username: this.form.getRawValue().username,
      password: this.form.getRawValue().password,
      departmentId: this.form.getRawValue().department.id,
      roleId: this.form.getRawValue().role.id,
    };
    this.userService.createOrUpdate(user, this.user?.id).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
