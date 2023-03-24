import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { routes } from './app.routes';
import { ClarityIcons, vmBugIcon } from '@cds/core/icon';

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [BrowserModule, ClarityModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(vmBugIcon);
  }
}
