import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private costCenterService: CostCenterService,
    private router: Router
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

  edit(id: string) {
    this.router.navigate(['/departments/', id]);
  }

  add() {
    this.router.navigate(['/departments/new']);
  }

  delete(id: string) {
    this.departmentService.delete(id).subscribe();
  }
}
