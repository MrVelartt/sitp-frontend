import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { detailRouteMock } from '@app/mocks';
import { Route, RouteFeature } from '@core/models';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from '@ionic/angular/standalone';
import { MainButtonComponent } from '@app/components';
import { Router } from '@angular/router';
import { RouteFeatureComponent } from './components';
import { LoadingService, RouteService } from '@core/services';
import { ToastService } from '../../core/services/toast.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.page.html',
  styleUrls: ['./route-detail.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    RouteFeatureComponent,
    IonText,
    MainButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteDetailPage {
  private readonly router = inject(Router);
  private readonly routeService = inject(RouteService);
  private readonly toastService = inject(ToastService);
  private readonly loadingService = inject(LoadingService);

  id = input<string>();

  protected route = computed<Route>(() => detailRouteMock(Number(this.id())));

  protected routeFeatures = computed<RouteFeature[]>(() => {
    return [
      {
        id: 1,
        icon: 'routes',
        title: 'Distancia',
        description: this.route().distance || '',
      },
      {
        id: 2,
        icon: 'time',
        title: 'Tiempo de viaje',
        description: this.route().travelTime || '',
      },
      {
        id: 3,
        icon: 'sunny',
        title: 'Primer bus',
        description: this.route().startTime || '',
      },
      {
        id: 4,
        icon: 'moon',
        title: 'Último bus',
        description: this.route().endTime || '',
      },
      {
        id: 5,
        icon: 'hourglass-outline',
        title: 'Frecuencia',
        description: `Cada ${this.route().frequency} minutos`,
      },
      {
        id: 6,
        icon: 'bus',
        title: 'Cantidad',
        description: `${this.route().countBuses?.toString()} buses`,
      },
    ];
  });

  protected keyNeighborhoods = computed<string>(() => {
    return this.route()?.keyNeighborhoods?.join(', ') || '';
  });

  constructor() {
    this.getRouteDetail();
  }

  async getRouteDetail(): Promise<void> {
    await this.loadingService.show('Cargando información de la ruta');
    try {
      const response = await lastValueFrom(
        this.routeService.getRouteDetail(Number(this.id()))
      );
      console.log('response', response);
    } catch (error) {
      console.error('getRouteDetail', error);
      this.toastService.show({
        isError: true,
        message: 'Error al obtener la información de la ruta',
      });
      this.backPage();
    } finally {
      this.loadingService.hide();
    }
  }

  navigateToMapWithRoute(routedId: number): void {
    console.log('navigateToMap', routedId, this.route());
    this.router.navigate(['map'], { queryParams: { routeId: routedId } });
  }

  backPage(): void {
    this.router.navigate(['routes']);
  }
}
