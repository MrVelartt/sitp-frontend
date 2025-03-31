import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ItemSearchComponent,
  MainButtonComponent,
  RouteCardComponent,
} from '@shared/components';
import { routesFavoritesMock } from '@app/mocks';
import { Route } from '@core/models';
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
  protected readonly search = signal<string>('');

  protected readonly filteredRoutes = computed<Route[]>(() => {
    const search = this.search().toLowerCase();

    return this.routes().filter(
      (route) =>
        route.name.toLowerCase().includes(search) ||
        route.keyNeighborhoods?.some((key) => key.toLowerCase() === search)
    );
  });

  constructor() {}

  searchRoute(search: string): void {
    console.log('searchRoute', search);
    this.search.set(search);
  }

  navigateToRouteDetail(routedId: string) {
    this.router.navigate(['route-detail', routedId]);
  }

  navigateToMapWithRoute(routedId: string): void {
    this.router.navigate(['map'], { queryParams: { routeId: routedId } });
  }

  navigateToMapWithRoutes(): void {
    const ids = this.routes().map((route) => route.id);
    this.router.navigate(['map'], { queryParams: { routeId: ids.join(',') } });
  }
}
