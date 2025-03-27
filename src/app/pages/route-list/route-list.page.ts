import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { routeMock } from '@app/mocks';
import { Route } from '@core/models';
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
import { LoadingService, RouteService, ToastService } from '@core/services';
import { lastValueFrom } from 'rxjs';

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
  private readonly router = inject(Router);
  private readonly routeService = inject(RouteService);
  private readonly toastService = inject(ToastService);
  private readonly loadingService = inject(LoadingService);

  protected readonly routes = signal<Route[]>(routeMock);
  protected readonly search = signal<string>('');

  protected readonly filteredRoutes = computed<Route[]>(() => {
    const search = this.search().toLowerCase();

    return this.routes().filter(
      (route) =>
        route.name.toLowerCase().includes(search) ||
        route.keyNeighborhoods?.some((key) => key.toLowerCase() === search)
    );
  });

  constructor() {
    this.getRoutes();
  }

  async getRoutes(): Promise<void> {
    await this.loadingService.show('Cargando rutas');
    try {
      const routes = await lastValueFrom(this.routeService.getRoutes());
      console.log('getRoutes', routes);
    } catch (error) {
      console.error('getRoutes', error);
      this.toastService.show({
        isError: true,
        message: 'Error obteniendo las rutas',
      });
    } finally {
      this.loadingService.hide();
    }
  }

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
