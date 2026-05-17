import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user/home/home').then((m) => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./user/products/product-list/product-list').then((m) => m.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./user/cart/cart').then((m) => m.CartComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./user/login/login').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./user/register/register').then((m) => m.RegisterComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/dashboard/dashboard').then((m) => m.AdminDashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
