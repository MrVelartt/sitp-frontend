import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
import { FavoriteService, LoadingService, ToastService } from '@core/services';

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
  private readonly router = inject(Router);
  private readonly favoriteService = inject(FavoriteService);
  private readonly loadingService = inject(LoadingService);
  private readonly toastService = inject(ToastService);

  // protected readonly routes = signal<Route[]>(routesFavoritesMock);
  protected readonly routes = computed<Route[]>(() =>
    this.favoriteService.getFormattedRoutes(),
  );
  protected readonly search = signal<string>('');

  protected readonly filteredRoutes = computed<Route[]>(() => {
    const search = this.search().toLowerCase();

    return this.routes().filter(
      (route) =>
        route.name.toLowerCase().includes(search) ||
        route.keyNeighborhoods?.some((key) => key.toLowerCase() === search),
    );
  });

  constructor() {}

  protected searchRoute(search: string): void {
    console.log('searchRoute', search);
    this.search.set(search);
  }

  protected navigateToRouteDetail(routedId: number) {
    this.router.navigate(['route-detail', routedId]);
  }

  protected navigateToMapWithRoute(routedId: number): void {
    this.router.navigate(['map'], { queryParams: { routeId: routedId } });
  }

  protected navigateToMapWithRoutes(): void {
    const ids = this.routes().map((route) => route.id);
    this.router.navigate(['map'], { queryParams: { routeId: ids.join(',') } });
  }

  protected async deleteFavorite(route: Route): Promise<void> {
    const { id } = route;
    await this.loadingService.show('Eliminando ruta de favoritos');
    try {
      await this.favoriteService.deleteRoute(id);
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
}
