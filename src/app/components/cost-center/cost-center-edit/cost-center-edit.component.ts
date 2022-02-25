import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, of, tap } from 'rxjs';
import { CostCenter } from 'src/app/models/cost-center.model';
import { CostCenterService } from 'src/app/services/cost-center.service';

@Component({
  selector: 'app-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
  styleUrls: ['./cost-center-edit.component.scss'],
})
export class CostCenterEditComponent implements OnInit {
  form: FormGroup;
  costCenter: CostCenter | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private costCenterService: CostCenterService,
    private router: Router
  ) {
    this.form = fb.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        mergeMap((params: Params) => {
          const id = params['id'];

          if (id !== 'new') {
            return this.costCenterService.getById(id).pipe(
              mergeMap((costCenter: CostCenter) => {
                this.costCenter = costCenter;
                this.form.patchValue(this.costCenter);
                return of(costCenter);
              })
            );
          }
          return of();
        })
      )
      .subscribe();
  }

  save() {
    this.costCenterService
      .createOrUpdate(this.form.getRawValue(), this.costCenter?.id)
      .subscribe(() => {
        this.router.navigate(['/cost-centers']);
      });
  }
}
