import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { convertHexToRgba } from '@shared/utils';
import { Route } from '@core/models';
import {
  IonItem,
  IonText,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/angular/standalone';
import { CapitalizePipe } from '@shared/pipes';

@Component({
  selector: 'app-home-recent-routes',
  templateUrl: './home-recent-routes.component.html',
  styleUrls: ['./home-recent-routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonRow, IonGrid, IonCol, IonText, IonItem, NgStyle, CapitalizePipe],
})
export class HomeRecentRoutesComponent {
  private readonly router = inject(Router);

  readonly recentRoutes = input.required<Route[]>();

  protected convertHexToRgba = convertHexToRgba;

  constructor() {}

  protected navigateToDetailRoute(routeId: number): void {
    this.router.navigate(['/route-detail', routeId]);
  }
}
