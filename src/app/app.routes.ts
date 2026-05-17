import { Routes } from '@angular/router';
import { CartComponent } from './user/cart/cart';
import { LoginComponent } from './user/login/login';
import { RegisterComponent } from './user/register/register';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';

export const routes: Routes = [
  { path: 'user/cart', component: CartComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent }
];
