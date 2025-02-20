import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ItemSearchComponent,
  MainButtonComponent,
  RouteCardComponent,
} from '@app/components';
import { routesFavoritesMock } from '@app/mocks';
import { Route } from '@app/models';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonList,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonList,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ItemSearchComponent,
    RouteCardComponent,
    MainButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPage {
  protected readonly router = inject(Router);
  protected readonly routes = signal<Route[]>(routesFavoritesMock);

  constructor() {}

  navigateToRouteDetail(routedId: string) {
    console.log('navigateToRouteDetail', routedId);
    this.router.navigate(['route-detail', routedId]);
  }

  navigateToMapWithRoute(routedId: string): void {
    console.log('navigateToMap', routedId);
    this.router.navigate(['map'], { queryParams: { routeId: routedId } });
  }

  navigateToMapWithRoutes(): void {
    const ids = this.routes().map((route) => route.id);
    this.router.navigate(['map'], { queryParams: { routeId: ids.join(',') } });
  }
}
