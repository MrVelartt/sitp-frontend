import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouteMock } from '@app/mocks';
import { Route } from '@app/models';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {
  MainButtonComponent,
  RouteCardComponent,
  ItemSearchComponent,
} from '@app/components';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.page.html',
  styleUrls: ['./route-list.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonCol,
    IonRow,
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
export class RouteListPage {
  protected readonly router = inject(Router);
  protected readonly routes = signal<Route[]>(RouteMock);
  protected readonly search = signal<string>('');

  protected readonly filteredRoutes = computed<Route[]>(() => {
    const search = this.search().toLowerCase();
    if (!search.trim()) {
      return this.routes();
    }
    return this.routes().filter((route) =>
      route.name.toLowerCase().includes(search)
    );
  });

  constructor() {}

  searchRoute(search: string): void {
    console.log('searchRoute', search);
    this.search.set(search);
  }

  navigateToRouteDetail(routedId: string): void {
    this.router.navigate(['route-detail', routedId]);
  }

  navigateToMapWithRoute(routedId: string): void {
    this.router.navigate(['map'], { queryParams: { routeId: routedId } });
  }

  navigateToMap(): void {
    this.router.navigate(['map']);
  }
}
