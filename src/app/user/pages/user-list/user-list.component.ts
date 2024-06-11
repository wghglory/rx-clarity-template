import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { AlertComponent, dgState, SpinnerComponent } from 'clr-lift';
import { computedAsync, createAsyncState } from 'ngx-lift';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule, AlertComponent, SpinnerComponent, ClarityModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  #userService = inject(UserService);

  #dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  #dgState$ = this.#dgBS.pipe(dgState(false));

  usersState = toSignal(
    combineLatest([this.#dgState$, this.#userService.refresh$]).pipe(
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

  refresh() {
    this.#userService.refreshList();
  }
}
