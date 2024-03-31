import { Component } from '@angular/core';

import { StandaloneModule } from '../shared/standalone.module';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [StandaloneModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {}
