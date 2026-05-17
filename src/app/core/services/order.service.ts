import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly orders = [
    { id: 9101, client: 'Green Valley', status: 'Processing', total: 1240 },
    { id: 9102, client: 'Al Amal Stores', status: 'Shipped', total: 876 },
    { id: 9103, client: 'Cedar Mart', status: 'Pending', total: 2100 }
  ];
}
