import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { AlertComponent, dgState, SpinnerComponent } from 'clr-lift';
import { combineFrom, computedAsync, createAsyncState } from 'ngx-lift';
import { BehaviorSubject, pipe, switchMap } from 'rxjs';

import { UserEditComponent } from '../../components/user-edit/user-edit.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list-advanced',
  standalone: true,
  imports: [RouterModule, AlertComponent, SpinnerComponent, ClarityModule, UserEditComponent],
  templateUrl: './user-list-advanced.component.html',
  styleUrl: './user-list-advanced.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListAdvancedComponent {
  #userService = inject(UserService);

  selectedUser = signal<User | null>(null);
  openEditDialog = model(false);

  #dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  #dgState$ = this.#dgBS.pipe(dgState(false));

  usersState = combineFrom(
    [this.#dgState$, this.#userService.refreshTrigger.value],
    pipe(
      switchMap(([state]) => {
        const params = { results: state?.page?.size || 10, page: state?.page?.current || 1 };
        return this.#userService.getUsers(params).pipe(createAsyncState());
      }),
    ),
  );

  // total will be updated every time this.dgState$ changes. Use previous value to avoid clr pagination flickering.
  // initialValue is the same as pageSize, and it affects this.dgState$ initial value.
  // clarity issue, pass 0, -1 won't work.
  total = computedAsync<number>(previousTotal => this.usersState()?.data?.info.total || previousTotal, { initialValue: 10 });

  onDgRefresh(state: ClrDatagridStateInterface) {
    this.#dgBS.next(state);
  }

  onEdit(user: User) {
    this.selectedUser.set(user);
    this.openEditDialog.set(true);
  }

  refresh() {
    this.#userService.refreshTrigger.next();
  }
}
