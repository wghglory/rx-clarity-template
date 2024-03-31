import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@NgModule({
  exports: [ClarityModule, CommonModule],
})
export class StandaloneModule {}
