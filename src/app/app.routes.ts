import { Routes } from '@angular/router';

import { UserDetailComponent } from './user/pages/user-detail/user-detail.component';
import { UserListComponent } from './user/pages/user-list/user-list.component';
import { UserListAdvancedComponent } from './user/pages/user-list-advanced/user-list-advanced.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-advanced',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserListComponent,
    pathMatch: 'full',
  },
  {
    path: 'users-advanced',
    component: UserListAdvancedComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    pathMatch: 'full',
  },
];
