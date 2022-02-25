import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { CostCenterListComponent } from './components/cost-center/cost-center-list/cost-center-list.component';
import { CostCenterEditComponent } from './components/cost-center/cost-center-edit/cost-center-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: EmployeesListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'departments',
    component: DepartmentListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cost-centers',
    component: CostCenterListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cost-centers/:id',
    component: CostCenterEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cost-centers/new',
    component: CostCenterEditComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
