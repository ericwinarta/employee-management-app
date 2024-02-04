import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  {
    path: 'add',
    component: EmployeeAddComponent
  },
  {
    path: 'detail/:username',
    component: EmployeeDetailComponent
  },
  {
    path: 'edit/:username',
    component: EmployeeEditComponent
  }
];
