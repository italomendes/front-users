import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
