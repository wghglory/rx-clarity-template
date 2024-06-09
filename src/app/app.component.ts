/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { angleIcon, ClarityIcons, cogIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { ThemeToggleComponent } from 'clr-lift';

ClarityIcons.addIcons(angleIcon, cogIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ClarityModule, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
