import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Core Shopping Routes (Clean URLs, Lazy Loaded)
  { 
    path: '', 
    loadComponent: () => import('./user/home/home').then(m => m.HomeComponent) 
  },
  { 
    path: 'products', 
    loadComponent: () => import('./user/products/product-list/product-list').then(m => m.ProductListComponent) 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./user/cart/cart').then(m => m.CartComponent) 
  },

  // 2. Authentication Routes
  { 
    path: 'login', 
    loadComponent: () => import('./user/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./user/register/register').then(m => m.RegisterComponent) 
  },

  // 3. Admin Control Center (Heavy code - perfectly lazy loaded)
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.AdminDashboardComponent) 
  },

  // 4. Fallback/Wildcard Route (Catches typos and sends them home)
  { 
    path: '**', 
    redirectTo: '' 
  }
];