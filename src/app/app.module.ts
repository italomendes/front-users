import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { MatSelectModule } from '@angular/material/select';
import { CostCenterListComponent } from './components/cost-center/cost-center-list/cost-center-list.component';
import { CostCenterEditComponent } from './components/cost-center/cost-center-edit/cost-center-edit.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesListComponent,
    DepartmentListComponent,
    CostCenterListComponent,
    CostCenterEditComponent,
    DepartmentEditComponent,
    EmployeeEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
