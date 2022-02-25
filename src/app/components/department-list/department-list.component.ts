import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CostCenter } from 'src/app/models/cost-center.model';
import { Department } from 'src/app/models/department.model';
import { CostCenterService } from 'src/app/services/cost-center.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  costCenters: CostCenter[] = [];
  selectedCostCenter: any;

  constructor(
    private departmentService: DepartmentService,
    private costCenterService: CostCenterService
  ) {
    this.departmentService
      .getAllDepartments()
      .pipe(take(1))
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });

    this.costCenterService
      .getAllCostCenter()
      .pipe(take(1))
      .subscribe((costCenters: CostCenter[]) => {
        this.costCenters = costCenters;
      });
  }

  ngOnInit(): void {}

  selectCostCenter(event: any) {
    this.departmentService
      .getDepartmentByCostCenter(event.value.id)
      .pipe(take(1))
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
    console.log(event);
  }
}
