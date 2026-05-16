import { Routes } from '@angular/router';
import { CartComponent } from './user/cart/cart';
import { LoginComponent } from './user/login/login';
import { RegisterComponent } from './user/register/register';

export const routes: Routes = [
  { path: 'user/cart', component: CartComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent }
];
