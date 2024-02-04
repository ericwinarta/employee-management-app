import { Routes } from '@angular/router';
import { LoginComponent } from './app-base/features/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app-base/app-base.routes').then(m => m.AppBaseRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
