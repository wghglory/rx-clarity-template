import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule],
  template: `<section class="container mx-auto py-5 px-10 md:px-14">
    <h2 class="!mb-6 !mt-0">{{ title }}</h2>
    <div class="space-y-6">
      <ng-content></ng-content>
    </div>
  </section>`,
})
export class PageContainerComponent {
  @Input() title = '';
}
