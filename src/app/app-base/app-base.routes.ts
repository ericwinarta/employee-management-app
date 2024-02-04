import { Routes } from '@angular/router';
import { AppBaseComponent } from './app-base.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { EmployeeService } from './features/employee/employee.service';
import { authGuard } from '../auth.guard';

export const AppBaseRoutes: Routes = [
  {
    path: '',
    component: AppBaseComponent,
    providers: [EmployeeService],
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'employee',
        loadChildren: () => import('./features/employee/employee.routes').then(m => m.EmployeeRoutes)
      }
    ]
  }
];
