import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, numberAttribute } from '@angular/core';
import { AlertComponent, SpinnerComponent } from 'clr-lift';
import { computedAsync, createAsyncState, injectParams } from 'ngx-lift';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [JsonPipe, AlertComponent, SpinnerComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  id = injectParams('id', { transform: numberAttribute, initialValue: 1 });

  #userService = inject(UserService);

  userState = computedAsync(() => this.#userService.getUser(this.id()!).pipe(createAsyncState()), { requireSync: true });
}
