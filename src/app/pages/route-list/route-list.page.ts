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
} from '@shared/components';
import {
  AppService,
  FavoriteService,
  LoadingService,
  RouteService,
  ToastService,
} from '@core/services';
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
  private readonly favoriteService = inject(FavoriteService);
  private readonly appService = inject(AppService);

  // protected readonly routes = signal<Route[]>(routeMock);
  protected readonly routes = signal<Route[]>([]);
  protected readonly search = signal<string>('');
  private readonly routesMap = this.favoriteService.getRoutesMap();

  protected readonly filteredRoutes = computed<Route[]>(() => {
    const search = this.search().toLowerCase();
    if (!search) return this.routes();

    return this.routes().filter(
      (route) =>
        route.name.toLowerCase().includes(search) ||
        route.keyNeighborhoods?.some((key) => key.toLowerCase() === search),
    );
  });

  constructor() {
    this.getRoutes();
  }

  ionViewDidEnter() {
    if (this.routes().length) {
      this.setFavoritesInRoutes();
    }
  }

  private async getRoutes(): Promise<void> {
    await this.loadingService.show('Cargando rutas');
    try {
      const routes = await lastValueFrom(this.routeService.getRoutes());
      console.log('getRoutes', routes);
      this.routes.set(routes);
      this.setFavoritesInRoutes();
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

  private setFavoritesInRoutes(): void {
    this.routes.update((currentRoutes) =>
      currentRoutes.map((route) => ({
        ...route,
        isFavorite: this.routesMap.has(route.id),
      })),
    );
  }

  protected searchRoute(search: string): void {
    this.search.set(search);
  }

  protected async navigateToRouteDetail(routedId: number): Promise<void> {
    console.log('navigateToRouteDetail', routedId, this.routesMap);
    try {
      const route = this.routes().find((route) => route.id === routedId);
      if (!route) throw new Error('Route not found');
      await this.appService.addRecentRoute(route);
    } catch (error) {
      console.error('navigateToRouteDetail', error);
      this.toastService.show({
        isError: true,
        message: 'No se pudo añadir la ruta a recientes',
      });
    }

    this.router.navigate(['route-detail', routedId]);
  }

  protected navigateToMapWithRoute(routedId: number): void {
    this.router.navigate(['map'], { queryParams: { id: routedId } });
  }

  protected favorite(route: Route): void {
    route.isFavorite ? this.deleteFavorite(route.id) : this.addFavorite(route);
  }

  private async addFavorite(route: Route): Promise<void> {
    await this.loadingService.show('Añadiendo ruta a favoritos');
    try {
      await this.favoriteService.addRoute(route);
      this.updateRouteFavoriteStatus(route.id, true);
      this.toastService.show({
        isError: false,
        message: 'Ruta añadida a favoritos',
      });
    } catch (error) {
      console.error('addFavorite', error);
      this.toastService.show({
        isError: true,
        message: 'Error añadiendo la ruta a favoritos',
      });
    } finally {
      this.loadingService.hide();
    }
  }

  private async deleteFavorite(routeId: number): Promise<void> {
    await this.loadingService.show('Eliminando ruta de favoritos');
    try {
      await this.favoriteService.deleteRoute(routeId);
      this.updateRouteFavoriteStatus(routeId, false);
      this.toastService.show({
        isError: false,
        message: 'Ruta eliminada de favoritos',
      });
    } catch (error) {
      console.error('deleteFavorite', error);
      this.toastService.show({
        isError: true,
        message: 'Error eliminando la ruta de favoritos',
      });
    } finally {
      this.loadingService.hide();
    }
  }

  private updateRouteFavoriteStatus(routeId: number, status: boolean): void {
    this.routes.update((currentRoutes) =>
      currentRoutes.map((r) => ({
        ...r,
        isFavorite: r.id === routeId ? status : r.isFavorite,
      })),
    );
  }

  protected navigateToMap(): void {
    const ids = this.routes().map((route) => route.id);
    this.router.navigate(['map'], { queryParams: { id: ids.join(',') } });
  }
}
