import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CostCenter } from 'src/app/models/cost-center.model';
import { CostCenterService } from 'src/app/services/cost-center.service';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrls: ['./cost-center-list.component.scss'],
})
export class CostCenterListComponent implements OnInit {
  costCenters: CostCenter[] = [];

  constructor(
    private costCenterService: CostCenterService,
    private router: Router
  ) {
    this.costCenterService
      .getAllCostCenter()
      .pipe(take(1))
      .subscribe((costCenters: CostCenter[]) => {
        this.costCenters = costCenters;
      });
  }

  edit(id: string) {
    this.router.navigate(['/cost-centers/', id]);
  }

  add() {
    this.router.navigate(['/cost-centers/new']);
  }

  ngOnInit(): void {}
}
