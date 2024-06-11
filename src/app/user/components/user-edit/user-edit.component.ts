import { ChangeDetectionStrategy, Component, effect, inject, input, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AlertComponent } from 'clr-lift';
import { computedAsync, createAsyncState, createTrigger } from 'ngx-lift';

import { UserService } from '../../services/user.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ClarityModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  #userService = inject(UserService);

  user = input.required<User>();
  open = model(false);

  form = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
  });

  saveTrigger = createTrigger();

  userState = computedAsync(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = this.form.value;

    // here should call the edit API
    // value is 0 initially, we don't want to trigger API call until trigger is > 0
    return this.saveTrigger.value()
      ? this.#userService.getUser(1).pipe(
          createAsyncState(() => {
            this.open.set(false);
            this.#userService.refreshTrigger.next();
          }),
        )
      : null;
  });

  cancel() {
    this.open.set(false);
  }

  confirm() {
    this.saveTrigger.next();
  }

  constructor() {
    effect(() => {
      this.form.setValue({ firstName: this.user().name.first });
    });
  }
}
