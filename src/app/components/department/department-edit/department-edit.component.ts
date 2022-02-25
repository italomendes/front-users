import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, of, take } from 'rxjs';
import { CostCenter } from 'src/app/models/cost-center.model';
import { Department } from 'src/app/models/department.model';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss'],
})
export class DepartmentEditComponent implements OnInit {
  form: FormGroup;
  costCenters: CostCenter[] = [];
  department: Department | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private costCenterService: CostCenterService,
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.form = fb.group({
      name: [null, Validators.required],
      costCenter: [null, Validators.required],
    });

    this.costCenterService
      .getAllCostCenter()
      .pipe(take(1))
      .subscribe((costCenters: CostCenter[]) => {
        this.costCenters = costCenters;
      });
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        mergeMap((params: Params) => {
          const id = params['id'];

          if (id !== 'new') {
            return this.departmentService.getById(id).pipe(
              mergeMap((department: Department) => {
                this.department = department;
                console.log(this.department);
                this.form.patchValue(this.department);
                return of(department);
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
    const department = {
      name: this.form.controls['name'].value,
      costCenterId: this.form.controls['costCenter'].value.id,
    };

    console.log(department);
    this.departmentService
      .createOrUpdate(department, this.department?.id)
      .subscribe(() => {
        this.router.navigate(['/departments']);
      });
  }
}
