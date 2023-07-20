import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-alert',
  template: `<clr-alert [clrAlertType]="type" [clrAlertSizeSmall]="isSmall">
    <clr-alert-item>
      <span *ngIf="error" class="alert-text" role="alert">{{ error.error?.message || error.message }}</span>
      <span *ngIf="content" class="alert-text" role="alert" [innerHTML]="content"></span>
    </clr-alert-item>
  </clr-alert> `,
  standalone: true,
  imports: [ClarityModule, CommonModule],
})
export class AlertComponent {
  @Input() type = 'danger';
  @Input() isSmall = false;
  @Input() error: HttpErrorResponse | undefined;
  @Input() content = '';
}
