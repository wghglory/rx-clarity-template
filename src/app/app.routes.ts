import { Route } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
];
