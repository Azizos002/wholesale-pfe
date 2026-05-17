import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  readonly stats = { revenue: 128450, totalOrders: 1942, activeUsers: 387 };
  readonly inventory = [
    { sku: 'WH-1029', name: 'Premium Dates', stock: 82, category: 'Food' },
    { sku: 'WH-2201', name: 'Olive Oil', stock: 41, category: 'Grocery' },
    { sku: 'WH-5308', name: 'Cleaning Kit', stock: 115, category: 'Household' }
  ];
  readonly reclamations = [
    { id: 4221, customer: 'Nour Market', subject: 'Late Delivery', priority: 'High' },
    { id: 4222, customer: 'Atlas Shop', subject: 'Damaged Package', priority: 'Medium' }
  ];
}
